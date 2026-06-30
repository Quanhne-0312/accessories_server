"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW view_users AS
            SELECT
                users.id,
                users.phone_number,
                users.email,
                users.name,
                images.secure_url AS avatar_url,
                users.address,
                users.birth,
                users.bio,
                roles.name AS role,
                users.role_id,
                roles.slug AS role_slug
            FROM users
            LEFT JOIN roles ON roles.id = users.role_id
            LEFT JOIN images ON images.target_id = users.id AND images.target_type = 'avatar';
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW view_products AS
            SELECT
                products.id,
                products.name,
                products.slug,
                products.brand,
                materials.id AS material_id,
                products.material,
                categories.id AS category_id,
                products.category,
                products.color,
                products.price,
                products.feature_image_url AS image_url,
                products.description,
                products.quantity,
                products.sold
            FROM products
            LEFT JOIN materials ON materials.name = products.material
            LEFT JOIN categories ON categories.name = products.category;
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW count_role_user_view AS
            SELECT
                roles.id,
                roles.name,
                roles.slug,
                COUNT(users.id)::integer AS user_count
            FROM roles
            LEFT JOIN users ON users.role_id = roles.id
            GROUP BY roles.id, roles.name, roles.slug;
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW count_product_by_category_view AS
            SELECT
                categories.id,
                categories.name,
                categories.slug,
                COUNT(products.id)::integer AS product_count
            FROM categories
            LEFT JOIN products ON products.category = categories.name
            GROUP BY categories.id, categories.name, categories.slug;
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW count_product_by_material_view AS
            SELECT
                materials.id,
                materials.name,
                materials.slug,
                COUNT(products.id)::integer AS product_count
            FROM materials
            LEFT JOIN products ON products.material = materials.name
            GROUP BY materials.id, materials.name, materials.slug;
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW count_product_by_color_view AS
            SELECT
                products.color AS name,
                COUNT(products.id)::integer AS product_count
            FROM products
            WHERE products.color IS NOT NULL AND products.color <> ''
            GROUP BY products.color;
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW view_history_order_update_status AS
            SELECT
                history_order_update.id,
                history_order_update.order_uuid,
                history_order_update.employee_id,
                history_order_update.description,
                history_order_update.status_id,
                status.code AS status_code,
                status.description AS status_description,
                history_order_update."createdAt",
                history_order_update."updatedAt"
            FROM history_order_update
            LEFT JOIN status ON status.id = history_order_update.status_id;
        `);

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE VIEW view_order_details AS
            SELECT
                order_details.id,
                order_details.name,
                categories.id AS "categoryId",
                order_details.feature_image_url AS "imageUrl",
                NULL::varchar AS unit,
                NULL::varchar AS size,
                order_details.price AS "oldPrice",
                order_details.price AS "newPrice",
                order_details.quantity,
                order_details.order_uuid AS "orderUuid",
                order_details.price AS "orderDetailsPrice"
            FROM order_details
            LEFT JOIN products ON products.id = order_details.product_id
            LEFT JOIN categories ON categories.name = products.category;
        `);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
            DROP VIEW IF EXISTS view_order_details;
            DROP VIEW IF EXISTS view_history_order_update_status;
            DROP VIEW IF EXISTS count_product_by_color_view;
            DROP VIEW IF EXISTS count_product_by_material_view;
            DROP VIEW IF EXISTS count_product_by_category_view;
            DROP VIEW IF EXISTS count_role_user_view;
            DROP VIEW IF EXISTS view_products;
            DROP VIEW IF EXISTS view_users;
        `);
    },
};
