"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.query(
            `update orders set inventory_reserved = false where status_id = 4 and inventory_reserved = true`,
        );
    },

    // This is a data correction: consumed inventory must not become reserved
    // again when rolling the migration back.
    down: async () => {},
};
