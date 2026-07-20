"use strict";

const slugify = (value) =>
    String(value || "")
        .replace(/\u0111/g, "d")
        .replace(/\u0110/g, "D")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const assertEmpty = async (sequelize, label, sql, transaction) => {
    const [rows] = await sequelize.query(sql, { transaction });

    if (rows.length > 0) {
        throw new Error(`Integrity preflight failed: ${label}. Clean the conflicting rows before migrating.`);
    }
};

const constraintExists = async (sequelize, name, transaction) => {
    const [rows] = await sequelize.query(
        `
        select 1
        from pg_constraint
        where conname = :name
          and connamespace = current_schema()::regnamespace
        limit 1
        `,
        { replacements: { name }, transaction },
    );

    return rows.length > 0;
};

const addForeignKey = async (
    queryInterface,
    { name, table, field, referencesTable, referencesField = "id", onDelete, onUpdate = "CASCADE" },
    transaction,
) => {
    if (await constraintExists(queryInterface.sequelize, name, transaction)) {
        return;
    }

    await queryInterface.addConstraint(table, {
        fields: [field],
        type: "foreign key",
        name,
        references: {
            table: referencesTable,
            field: referencesField,
        },
        onDelete,
        onUpdate,
        transaction,
    });
};

const removeConstraintIfExists = async (queryInterface, table, name, transaction) => {
    if (await constraintExists(queryInterface.sequelize, name, transaction)) {
        await queryInterface.removeConstraint(table, name, { transaction });
    }
};

const ensureColors = async (queryInterface, Sequelize, transaction) => {
    await queryInterface.sequelize.query(
        `
        create table if not exists colors (
            id serial primary key,
            slug varchar(255),
            name varchar(255),
            "createdAt" timestamp with time zone not null default now(),
            "updatedAt" timestamp with time zone not null default now()
        )
        `,
        { transaction },
    );

    await queryInterface.sequelize.query(
        `
        alter table colors add column if not exists slug varchar(255);
        alter table colors add column if not exists name varchar(255);
        alter table colors add column if not exists "createdAt" timestamp with time zone not null default now();
        alter table colors add column if not exists "updatedAt" timestamp with time zone not null default now();
        `,
        { transaction },
    );

    const [existingRows] = await queryInterface.sequelize.query(
        `select id, slug, name from colors order by id`,
        { transaction },
    );
    const usedSlugs = new Set(existingRows.map((row) => row.slug).filter(Boolean));

    for (const row of existingRows) {
        if (row.slug || !row.name) continue;

        const baseSlug = slugify(row.name) || `color-${row.id}`;
        let candidate = baseSlug;
        let suffix = 2;

        while (usedSlugs.has(candidate)) {
            candidate = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        await queryInterface.sequelize.query(`update colors set slug = :slug where id = :id`, {
            replacements: { id: row.id, slug: candidate },
            transaction,
        });
        usedSlugs.add(candidate);
    }

    const [productColors] = await queryInterface.sequelize.query(
        `
        select distinct color as name
        from products
        where color is not null and trim(color) <> ''
        order by color
        `,
        { transaction },
    );
    const knownNames = new Set(existingRows.map((row) => row.name).filter(Boolean));

    for (const { name } of productColors) {
        if (knownNames.has(name)) continue;

        const baseSlug = slugify(name) || "color";
        let candidate = baseSlug;
        let suffix = 2;

        while (usedSlugs.has(candidate)) {
            candidate = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        await queryInterface.sequelize.query(
            `
            insert into colors (slug, name, "createdAt", "updatedAt")
            values (:slug, :name, now(), now())
            `,
            { replacements: { name, slug: candidate }, transaction },
        );
        knownNames.add(name);
        usedSlugs.add(candidate);
    }
};

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await ensureColors(queryInterface, Sequelize, transaction);

            await queryInterface.sequelize.query(
                `
                alter table customers add column if not exists "createdAt" timestamp with time zone not null default now();
                alter table customers add column if not exists "updatedAt" timestamp with time zone not null default now();
                alter table employees add column if not exists "createdAt" timestamp with time zone not null default now();
                alter table employees add column if not exists "updatedAt" timestamp with time zone not null default now();
                `,
                { transaction },
            );

            const duplicateChecks = [
                [
                    "duplicate user phone numbers",
                    `select 1 from users where phone_number is not null group by phone_number having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate user emails (case-insensitive)",
                    `select 1 from users where email is not null group by lower(email) having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate product slugs",
                    `select 1 from products where slug is not null group by slug having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate order UUIDs",
                    `select 1 from orders where order_uuid is not null group by order_uuid having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate refresh-token owners",
                    `select 1 from refresh_tokens where phone_number is not null group by phone_number having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate cart items",
                    `select 1 from carts where user_id is not null and product_id is not null group by user_id, product_id having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate category slugs or names",
                    `select 1 from (select slug from categories group by slug having count(*) > 1 union all select name from categories group by name having count(*) > 1) duplicates limit 1`,
                ],
                [
                    "duplicate material slugs or names",
                    `select 1 from (select slug from materials group by slug having count(*) > 1 union all select name from materials group by name having count(*) > 1) duplicates limit 1`,
                ],
                [
                    "duplicate color slugs or names",
                    `select 1 from (select slug from colors group by slug having count(*) > 1 union all select name from colors group by name having count(*) > 1) duplicates limit 1`,
                ],
                [
                    "duplicate role slugs",
                    `select 1 from roles where slug is not null group by slug having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate status codes",
                    `select 1 from status where code is not null group by code having count(*) > 1 limit 1`,
                ],
                [
                    "duplicate payment-method slugs",
                    `select 1 from payment_methods where slug is not null group by slug having count(*) > 1 limit 1`,
                ],
                [
                    "multiple avatars for one user",
                    `select 1 from images where target_type = 'avatar' group by target_id having count(*) > 1 limit 1`,
                ],
            ];

            for (const [label, sql] of duplicateChecks) {
                await assertEmpty(queryInterface.sequelize, label, sql, transaction);
            }

            await queryInterface.sequelize.query(
                `
                update products p
                set category = c.name
                from categories c
                where p.category is not null
                  and p.category <> c.name
                  and (p.category = c.slug or p.category = c.id::text)
                  and not exists (select 1 from categories current_value where current_value.name = p.category);

                update products p
                set material = m.name
                from materials m
                where p.material is not null
                  and p.material <> m.name
                  and (p.material = m.slug or p.material = m.id::text)
                  and not exists (select 1 from materials current_value where current_value.name = p.material);

                update products p
                set color = c.name
                from colors c
                where p.color is not null
                  and p.color <> c.name
                  and (p.color = c.slug or p.color = c.id::text)
                  and not exists (select 1 from colors current_value where current_value.name = p.color);
                `,
                { transaction },
            );

            const requiredValueChecks = [
                ["products without a slug", `select 1 from products where slug is null or trim(slug) = '' limit 1`],
                [
                    "products without a catalog value",
                    `select 1 from products where category is null or material is null or color is null or trim(category) = '' or trim(material) = '' or trim(color) = '' limit 1`,
                ],
                ["orders without a UUID", `select 1 from orders where order_uuid is null or trim(order_uuid) = '' limit 1`],
                [
                    "order details without an order UUID",
                    `select 1 from order_details where order_uuid is null or trim(order_uuid) = '' limit 1`,
                ],
                [
                    "order history without an order UUID",
                    `select 1 from history_order_update where order_uuid is null or trim(order_uuid) = '' limit 1`,
                ],
                [
                    "catalog rows with missing slugs or names",
                    `select 1 from categories where slug is null or name is null or trim(slug) = '' or trim(name) = '' union all select 1 from materials where slug is null or name is null or trim(slug) = '' or trim(name) = '' union all select 1 from colors where slug is null or name is null or trim(slug) = '' or trim(name) = '' limit 1`,
                ],
            ];

            for (const [label, sql] of requiredValueChecks) {
                await assertEmpty(queryInterface.sequelize, label, sql, transaction);
            }

            const orphanChecks = [
                [
                    "users referencing missing roles",
                    `select 1 from users u left join roles r on r.id = u.role_id where u.role_id is not null and r.id is null limit 1`,
                ],
                [
                    "employees referencing missing users",
                    `select 1 from employees e left join users u on u.id = e.user_id where e.user_id is not null and u.id is null limit 1`,
                ],
                [
                    "cart rows referencing missing users or products",
                    `select 1 from carts c left join users u on u.id = c.user_id left join products p on p.id = c.product_id where (c.user_id is not null and u.id is null) or (c.product_id is not null and p.id is null) limit 1`,
                ],
                [
                    "products referencing unknown catalog values",
                    `select 1 from products p left join categories c on c.name = p.category left join materials m on m.name = p.material left join colors co on co.name = p.color where c.id is null or m.id is null or co.id is null limit 1`,
                ],
                [
                    "orders referencing missing related rows",
                    `select 1 from orders o left join users u on u.id = o.employee_id left join shipping_addresses a on a.id = o.shipping_address_id left join payment_methods p on p.id = o.payment_method_id left join status s on s.id = o.status_id where (o.employee_id is not null and u.id is null) or (o.shipping_address_id is not null and a.id is null) or (o.payment_method_id is not null and p.id is null) or (o.status_id is not null and s.id is null) limit 1`,
                ],
                [
                    "order details referencing missing orders or products",
                    `select 1 from order_details d left join orders o on o.order_uuid = d.order_uuid left join products p on p.id = d.product_id where o.id is null or (d.product_id is not null and p.id is null) limit 1`,
                ],
                [
                    "order history referencing missing rows",
                    `select 1 from history_order_update h left join orders o on o.order_uuid = h.order_uuid left join users u on u.id = h.employee_id left join status s on s.id = h.status_id where o.id is null or (h.employee_id is not null and u.id is null) or (h.status_id is not null and s.id is null) limit 1`,
                ],
                [
                    "reviews referencing missing users or products",
                    `select 1 from reviews r left join users u on u.id = r.user_id left join products p on p.id = r.product_id where (r.user_id is not null and u.id is null) or (r.product_id is not null and p.id is null) limit 1`,
                ],
                [
                    "refresh tokens referencing missing users",
                    `select 1 from refresh_tokens t left join users u on u.phone_number = t.phone_number where t.phone_number is not null and u.id is null limit 1`,
                ],
            ];

            for (const [label, sql] of orphanChecks) {
                await assertEmpty(queryInterface.sequelize, label, sql, transaction);
            }

            await queryInterface.sequelize.query(
                `
                alter table products alter column slug set not null;
                alter table products alter column category set not null;
                alter table products alter column material set not null;
                alter table products alter column color set not null;
                alter table orders alter column order_uuid set not null;
                alter table order_details alter column order_uuid set not null;
                alter table history_order_update alter column order_uuid set not null;
                alter table categories alter column slug set not null;
                alter table categories alter column name set not null;
                alter table materials alter column slug set not null;
                alter table materials alter column name set not null;
                alter table colors alter column slug set not null;
                alter table colors alter column name set not null;

                create unique index if not exists users_phone_number_key on users (phone_number);
                create unique index if not exists users_email_lower_key on users (lower(email)) where email is not null;
                create unique index if not exists products_slug_key on products (slug);
                create unique index if not exists orders_order_uuid_key on orders (order_uuid);
                create unique index if not exists refresh_tokens_phone_number_key on refresh_tokens (phone_number);
                create unique index if not exists carts_user_product_key on carts (user_id, product_id) where user_id is not null and product_id is not null;
                create unique index if not exists categories_slug_key on categories (slug);
                create unique index if not exists categories_name_key on categories (name);
                create unique index if not exists materials_slug_key on materials (slug);
                create unique index if not exists materials_name_key on materials (name);
                create unique index if not exists colors_slug_key on colors (slug);
                create unique index if not exists colors_name_key on colors (name);
                create unique index if not exists roles_slug_key on roles (slug);
                create unique index if not exists status_code_key on status (code);
                create unique index if not exists payment_methods_slug_key on payment_methods (slug);
                create unique index if not exists images_one_avatar_per_user_key on images (target_id, target_type) where target_type = 'avatar';

                create index if not exists images_target_idx on images (target_type, target_id);
                create index if not exists products_catalog_idx on products (category, material, color);
                create index if not exists orders_customer_phone_idx on orders (customer_phone_number);
                create index if not exists orders_status_idx on orders (status_id);
                create index if not exists order_details_order_uuid_idx on order_details (order_uuid);
                create index if not exists history_order_update_order_uuid_idx on history_order_update (order_uuid);
                `,
                { transaction },
            );

            const foreignKeys = [
                {
                    name: "users_role_id_fkey",
                    table: "users",
                    field: "role_id",
                    referencesTable: "roles",
                    onDelete: "RESTRICT",
                },
                {
                    name: "employees_user_id_fkey",
                    table: "employees",
                    field: "user_id",
                    referencesTable: "users",
                    onDelete: "CASCADE",
                },
                {
                    name: "carts_user_id_fkey",
                    table: "carts",
                    field: "user_id",
                    referencesTable: "users",
                    onDelete: "CASCADE",
                },
                {
                    name: "carts_product_id_fkey",
                    table: "carts",
                    field: "product_id",
                    referencesTable: "products",
                    onDelete: "CASCADE",
                },
                {
                    name: "products_category_fkey",
                    table: "products",
                    field: "category",
                    referencesTable: "categories",
                    referencesField: "name",
                    onDelete: "RESTRICT",
                },
                {
                    name: "products_material_fkey",
                    table: "products",
                    field: "material",
                    referencesTable: "materials",
                    referencesField: "name",
                    onDelete: "RESTRICT",
                },
                {
                    name: "products_color_fkey",
                    table: "products",
                    field: "color",
                    referencesTable: "colors",
                    referencesField: "name",
                    onDelete: "RESTRICT",
                },
                {
                    name: "orders_employee_id_fkey",
                    table: "orders",
                    field: "employee_id",
                    referencesTable: "users",
                    onDelete: "SET NULL",
                },
                {
                    name: "orders_shipping_address_id_fkey",
                    table: "orders",
                    field: "shipping_address_id",
                    referencesTable: "shipping_addresses",
                    onDelete: "RESTRICT",
                },
                {
                    name: "orders_payment_method_id_fkey",
                    table: "orders",
                    field: "payment_method_id",
                    referencesTable: "payment_methods",
                    onDelete: "RESTRICT",
                },
                {
                    name: "orders_status_id_fkey",
                    table: "orders",
                    field: "status_id",
                    referencesTable: "status",
                    onDelete: "RESTRICT",
                },
                {
                    name: "order_details_order_uuid_fkey",
                    table: "order_details",
                    field: "order_uuid",
                    referencesTable: "orders",
                    referencesField: "order_uuid",
                    onDelete: "CASCADE",
                },
                {
                    name: "order_details_product_id_fkey",
                    table: "order_details",
                    field: "product_id",
                    referencesTable: "products",
                    onDelete: "SET NULL",
                },
                {
                    name: "history_order_update_order_uuid_fkey",
                    table: "history_order_update",
                    field: "order_uuid",
                    referencesTable: "orders",
                    referencesField: "order_uuid",
                    onDelete: "CASCADE",
                },
                {
                    name: "history_order_update_employee_id_fkey",
                    table: "history_order_update",
                    field: "employee_id",
                    referencesTable: "users",
                    onDelete: "SET NULL",
                },
                {
                    name: "history_order_update_status_id_fkey",
                    table: "history_order_update",
                    field: "status_id",
                    referencesTable: "status",
                    onDelete: "RESTRICT",
                },
                {
                    name: "reviews_user_id_fkey",
                    table: "reviews",
                    field: "user_id",
                    referencesTable: "users",
                    onDelete: "SET NULL",
                },
                {
                    name: "reviews_product_id_fkey",
                    table: "reviews",
                    field: "product_id",
                    referencesTable: "products",
                    onDelete: "CASCADE",
                },
                {
                    name: "refresh_tokens_phone_number_fkey",
                    table: "refresh_tokens",
                    field: "phone_number",
                    referencesTable: "users",
                    referencesField: "phone_number",
                    onDelete: "CASCADE",
                },
            ];

            for (const foreignKey of foreignKeys) {
                await addForeignKey(queryInterface, foreignKey, transaction);
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            const foreignKeys = [
                ["refresh_tokens", "refresh_tokens_phone_number_fkey"],
                ["reviews", "reviews_product_id_fkey"],
                ["reviews", "reviews_user_id_fkey"],
                ["history_order_update", "history_order_update_status_id_fkey"],
                ["history_order_update", "history_order_update_employee_id_fkey"],
                ["history_order_update", "history_order_update_order_uuid_fkey"],
                ["order_details", "order_details_product_id_fkey"],
                ["order_details", "order_details_order_uuid_fkey"],
                ["orders", "orders_status_id_fkey"],
                ["orders", "orders_payment_method_id_fkey"],
                ["orders", "orders_shipping_address_id_fkey"],
                ["orders", "orders_employee_id_fkey"],
                ["products", "products_color_fkey"],
                ["products", "products_material_fkey"],
                ["products", "products_category_fkey"],
                ["carts", "carts_product_id_fkey"],
                ["carts", "carts_user_id_fkey"],
                ["employees", "employees_user_id_fkey"],
                ["users", "users_role_id_fkey"],
            ];

            for (const [table, name] of foreignKeys) {
                await removeConstraintIfExists(queryInterface, table, name, transaction);
            }

            await queryInterface.sequelize.query(
                `
                drop index if exists images_one_avatar_per_user_key;
                drop index if exists payment_methods_slug_key;
                drop index if exists status_code_key;
                drop index if exists roles_slug_key;
                drop index if exists materials_name_key;
                drop index if exists materials_slug_key;
                drop index if exists categories_name_key;
                drop index if exists categories_slug_key;
                drop index if exists carts_user_product_key;
                drop index if exists refresh_tokens_phone_number_key;
                drop index if exists orders_order_uuid_key;
                drop index if exists products_slug_key;
                drop index if exists users_email_lower_key;
                drop index if exists users_phone_number_key;
                drop index if exists history_order_update_order_uuid_idx;
                drop index if exists order_details_order_uuid_idx;
                drop index if exists orders_status_idx;
                drop index if exists orders_customer_phone_idx;
                drop index if exists products_catalog_idx;
                drop index if exists images_target_idx;

                alter table history_order_update alter column order_uuid drop not null;
                alter table order_details alter column order_uuid drop not null;
                alter table orders alter column order_uuid drop not null;
                alter table products alter column color drop not null;
                alter table products alter column material drop not null;
                alter table products alter column category drop not null;
                alter table products alter column slug drop not null;
                alter table materials alter column name drop not null;
                alter table materials alter column slug drop not null;
                alter table categories alter column name drop not null;
                alter table categories alter column slug drop not null;

                drop table if exists colors;
                `,
                { transaction },
            );
        });
    },
};
