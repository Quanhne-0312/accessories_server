"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = new Date();
        const defaultPasswordHash = "$2a$10$XT.VGE7USxy3uu/dI9SDsu7RMqf2rjzCPOcedYlz9EsIKHdmbrkKa";

        await queryInterface.bulkInsert("roles", [
            { id: 1, slug: "administrator", name: "Administrator" },
            { id: 2, slug: "employee", name: "Employee" },
            { id: 3, slug: "customer", name: "Customer" },
            { id: 4, slug: "manager", name: "Manager" },
        ]);

        await queryInterface.bulkInsert("status", [
            { id: 1, code: "PROCESSED", description: "Da tiep nhan" },
            { id: 2, code: "CONFIRMED", description: "Da xac nhan" },
            { id: 3, code: "ON_SHIPPED", description: "Dang giao hang" },
            { id: 4, code: "FINISHED", description: "Hoan thanh" },
            { id: 5, code: "CANCELED", description: "Da huy" },
        ]);

        await queryInterface.bulkInsert("payment_methods", [
            { id: 1, slug: "cod", name: "Thanh toan khi nhan hang", description: "Cash on delivery" },
            { id: 2, slug: "bank-transfer", name: "Chuyen khoan ngan hang", description: "Bank transfer" },
        ]);

        await queryInterface.bulkInsert("categories", [
            { id: 1, slug: "bags", name: "Bags" },
            { id: 2, slug: "wallets", name: "Wallets" },
            { id: 3, slug: "jewelry", name: "Jewelry" },
            { id: 4, slug: "glasses", name: "Glasses" },
        ]);

        await queryInterface.bulkInsert("materials", [
            { id: 1, slug: "leather", name: "Leather" },
            { id: 2, slug: "metal", name: "Metal" },
            { id: 3, slug: "fabric", name: "Fabric" },
            { id: 4, slug: "plastic", name: "Plastic" },
        ]);

        await queryInterface.bulkInsert("users", [
            {
                phone_number: "0989999999",
                email: "admin@accessories.local",
                password: defaultPasswordHash,
                name: "Admin",
                address: "Default address",
                birth: "1996-07-31",
                last_login: null,
                role_id: 1,
                bio: null,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        for (const table of ["roles", "status", "payment_methods", "categories", "materials"]) {
            await queryInterface.sequelize.query(
                `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE(MAX("id"), 1), MAX("id") IS NOT NULL) FROM "${table}";`,
            );
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("users", { email: "admin@accessories.local" }, {});
        await queryInterface.bulkDelete("materials", null, {});
        await queryInterface.bulkDelete("categories", null, {});
        await queryInterface.bulkDelete("payment_methods", null, {});
        await queryInterface.bulkDelete("status", null, {});
        await queryInterface.bulkDelete("roles", null, {});
    },
};
