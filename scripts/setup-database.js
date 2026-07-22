"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const dotenv = require("dotenv");
const { QueryTypes, Sequelize } = require("sequelize");

const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(projectRoot, ".env") });

const environment = process.env.NODE_ENV?.trim() || "development";
const database = process.env.NODE_DATABASE_NAME?.trim();
const username = process.env.NODE_DATABASE_USERNAME?.trim();
const password = process.env.NODE_DATABASE_PASSWORD || "";
const host = process.env.NODE_DATABASE_HOST?.trim() || "localhost";
const port = Number(process.env.NODE_DATABASE_PORT || 5432);
const dialect = process.env.NODE_DATABASE_DIALECT?.trim() || "postgres";
const maintenanceDatabase = process.env.NODE_DATABASE_MAINTENANCE_NAME?.trim() || "postgres";

const fail = (message) => {
    throw new Error(message);
};

const validateConfiguration = () => {
    if (environment !== "development") {
        fail("db:setup is only available when NODE_ENV=development.");
    }
    if (!database) fail("NODE_DATABASE_NAME is missing in .env.");
    if (!username) fail("NODE_DATABASE_USERNAME is missing in .env.");
    if (dialect !== "postgres") fail("db:setup currently supports PostgreSQL only.");
    if (!Number.isInteger(port) || port <= 0) fail("NODE_DATABASE_PORT is invalid.");
    if (database === maintenanceDatabase) {
        fail("NODE_DATABASE_NAME must be different from NODE_DATABASE_MAINTENANCE_NAME.");
    }
};

const quoteIdentifier = (value) => `"${String(value).replace(/"/g, '""')}"`;

const createConnection = (databaseName) =>
    new Sequelize(databaseName, username, password, {
        dialect,
        host,
        port,
        logging: false,
        pool: { max: 2, min: 0, acquire: 15000, idle: 5000 },
    });

const ensureDatabaseExists = async () => {
    const connection = createConnection(maintenanceDatabase);

    try {
        await connection.authenticate();
        const rows = await connection.query("select 1 from pg_database where datname = :database", {
            replacements: { database },
            type: QueryTypes.SELECT,
        });

        if (rows.length === 0) {
            await connection.query(`create database ${quoteIdentifier(database)}`);
            console.log(`Created database ${database}.`);
        } else {
            console.log(`Database ${database} already exists.`);
        }
    } finally {
        await connection.close();
    }
};

const runNodeCommand = (label, executable, args = []) => {
    console.log(`\n${label}...`);
    const result = spawnSync(process.execPath, [executable, ...args], {
        cwd: projectRoot,
        env: process.env,
        stdio: "inherit",
    });

    if (result.error) throw result.error;
    if (result.status !== 0) fail(`${label} failed with exit code ${result.status}.`);
};

const runMigrationsAndBaseSeed = () => {
    const sequelizeCli = require.resolve("sequelize-cli/lib/sequelize");

    runNodeCommand("Running migrations", sequelizeCli, ["db:migrate"]);
    runNodeCommand("Seeding default administrator and lookup data", sequelizeCli, ["db:seed:all"]);
};

const getCatalogSummary = async () => {
    const connection = createConnection(database);

    try {
        const [summary] = await connection.query(
            `
            select
                (select count(*)::int from products) as products,
                (select count(*)::int from images where target_type = 'product') as images,
                (
                    select coalesce(min(image_count), 0)::int
                    from (
                        select count(i.id)::int as image_count
                        from products p
                        left join images i
                          on i.target_id = p.id
                         and i.target_type = 'product'
                        group by p.id
                    ) product_image_counts
                ) as min_product_images,
                (
                    select coalesce(max(image_count), 0)::int
                    from (
                        select count(i.id)::int as image_count
                        from products p
                        left join images i
                          on i.target_id = p.id
                         and i.target_type = 'product'
                        group by p.id
                    ) product_image_counts
                ) as max_product_images,
                (
                    select count(*)::int
                    from users u
                    join roles r on r.id = u.role_id
                    where r.slug = 'administrator'
                ) as administrators,
                (select count(*)::int from users) as users,
                (select count(*)::int from orders) as orders
            `,
            { type: QueryTypes.SELECT },
        );

        return summary;
    } finally {
        await connection.close();
    }
};

const seedCatalogWhenNeeded = async () => {
    const before = await getCatalogSummary();

    if (before.products === 0) {
        runNodeCommand(
            "Seeding 40 products and 200 local images",
            path.join(projectRoot, "scripts", "seed-products-by-category.js"),
        );
        return;
    }

    if (before.products !== 40) {
        fail(
            `Database already contains ${before.products} products. ` +
                "db:setup stops to avoid overwriting an existing catalog.",
        );
    }

    if (
        before.images !== 200 ||
        before.min_product_images !== 5 ||
        before.max_product_images !== 5
    ) {
        runNodeCommand(
            "Repairing product image records",
            path.join(projectRoot, "scripts", "sync-product-images.js"),
        );
    }
};

const verifyResult = async () => {
    const summary = await getCatalogSummary();

    if (
        summary.products !== 40 ||
        summary.images !== 200 ||
        summary.min_product_images !== 5 ||
        summary.max_product_images !== 5 ||
        summary.administrators < 1
    ) {
        fail(`Database verification failed: ${JSON.stringify(summary)}.`);
    }

    console.log("\nDatabase setup completed successfully:");
    console.log(JSON.stringify(summary, null, 2));
};

const main = async () => {
    validateConfiguration();
    await ensureDatabaseExists();
    runMigrationsAndBaseSeed();
    await seedCatalogWhenNeeded();
    await verifyResult();
};

main().catch((error) => {
    console.error(`\nDatabase setup failed: ${error.message}`);
    process.exitCode = 1;
});
