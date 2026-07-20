"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            const [sharedOrderAddresses] = await queryInterface.sequelize.query(
                `
                select
                    o.id as order_id,
                    o.shipping_address_id,
                    a.receiver_name,
                    a.receiver_phone,
                    a.receiver_address,
                    row_number() over (
                        partition by o.shipping_address_id
                        order by o.id
                    ) as snapshot_number
                from orders o
                join shipping_addresses a on a.id = o.shipping_address_id
                where o.shipping_address_id is not null
                order by o.shipping_address_id, o.id
                `,
                { transaction },
            );

            for (const address of sharedOrderAddresses) {
                if (Number(address.snapshot_number) === 1) continue;

                const [createdAddresses] = await queryInterface.sequelize.query(
                    `
                    insert into shipping_addresses (receiver_name, receiver_phone, receiver_address)
                    values (:receiverName, :receiverPhone, :receiverAddress)
                    returning id
                    `,
                    {
                        replacements: {
                            receiverName: address.receiver_name,
                            receiverPhone: address.receiver_phone,
                            receiverAddress: address.receiver_address,
                        },
                        transaction,
                    },
                );

                await queryInterface.sequelize.query(
                    `update orders set shipping_address_id = :shippingAddressId where id = :orderId`,
                    {
                        replacements: {
                            orderId: address.order_id,
                            shippingAddressId: createdAddresses[0].id,
                        },
                        transaction,
                    },
                );
            }

            await queryInterface.sequelize.query(
                `
                create unique index if not exists orders_shipping_address_snapshot_key
                on orders (shipping_address_id)
                where shipping_address_id is not null
                `,
                { transaction },
            );
        });
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`drop index if exists orders_shipping_address_snapshot_key`);
    },
};
