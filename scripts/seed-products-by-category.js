"use strict";

const db = require("../src/models");
const { getProductImageSet } = require("./product-image-catalog");

db.sequelize.options.logging = false;

const TARGET_PER_CATEGORY = 10;

const CATEGORY_CONFIG = [
    { slug: "vong-tay", name: "Vòng tay", label: "VONG TAY" },
    { slug: "day-chuyen", name: "Dây chuyền", label: "DAY CHUYEN" },
    { slug: "khuyen-tai", name: "Bông tai", label: "BONG TAI" },
    { slug: "nhan", name: "Nhẫn", label: "NHAN" },
];

const MATERIALS = [
    { slug: "bac", name: "Bạc" },
    { slug: "vang", name: "Vàng" },
    { slug: "thep", name: "Thép không gỉ" },
    { slug: "ngoc-trai", name: "Ngọc trai" },
];

const BRANDS = ["Ahihi Studio", "Luna Charm", "Mira Jewelry", "Elysian", "Aurora Gems"];
const COLORS = ["Bạc", "Vàng", "Vàng hồng", "Trắng", "Đen", "Xanh ngọc"];

const CATALOG = {
    "vong-tay": [
        "Vòng tay charm hoa trà",
        "Lắc tay bạc ánh trăng",
        "Vòng tay ngọc trai nhỏ",
        "Lắc tay mắt xích mảnh",
        "Vòng tay đá xanh biển",
        "Lắc tay cỏ bốn lá",
        "Vòng tay tim đôi",
        "Lắc tay sao Bắc Đẩu",
        "Vòng tay dây bi vàng",
        "Lắc tay hạt ngọc",
        "Vòng tay tennis đá sáng",
        "Lắc tay vân xoắn",
        "Vòng tay dây rút may mắn",
        "Lắc tay hoa tuyết",
        "Vòng tay tròn tối giản",
        "Lắc tay ngọc trai baroque",
        "Vòng tay mặt trăng",
        "Lắc tay khóa chữ T",
        "Vòng tay đá đen",
        "Lắc tay thiên thần",
    ],
    "day-chuyen": [
        "Dây chuyền mặt trăng",
        "Dây chuyền ngọc trai đơn",
        "Dây chuyền trái tim bạc",
        "Dây chuyền khóa tròn",
        "Dây chuyền sao nhỏ",
        "Dây chuyền mặt chữ nhật",
        "Dây chuyền cỏ may mắn",
        "Dây chuyền giọt nước",
        "Dây chuyền mắt xích vàng",
        "Dây chuyền đá xanh",
        "Dây chuyền ngọc trai tầng",
        "Dây chuyền mặt hoa",
        "Dây chuyền thiên nga",
        "Dây chuyền mặt oval",
        "Dây chuyền vòng tròn đôi",
        "Dây chuyền chữ cái",
        "Dây chuyền bạc tối giản",
        "Dây chuyền khóa tim",
        "Dây chuyền mặt nắng",
        "Dây chuyền pha lê",
    ],
    "khuyen-tai": [
        "Bông tai ngọc trai tròn",
        "Bông tai vòng nhỏ",
        "Bông tai đá xanh",
        "Bông tai hoa trà",
        "Bông tai trái tim",
        "Bông tai sao rơi",
        "Bông tai giọt nước",
        "Bông tai bạc basic",
        "Bông tai vòng xoắn",
        "Bông tai cỏ bốn lá",
        "Bông tai pha lê",
        "Bông tai dây thả",
        "Bông tai mặt trăng",
        "Bông tai nơ nhỏ",
        "Bông tai oval",
        "Bông tai baroque",
        "Bông tai lá olive",
        "Bông tai vòng kép",
        "Bông tai đá đen",
        "Bông tai thiên nga",
    ],
    nhan: [
        "Nhẫn bạc đính đá",
        "Nhẫn vàng hồng mảnh",
        "Nhẫn ngọc trai nhỏ",
        "Nhẫn đôi tối giản",
        "Nhẫn xoắn ánh kim",
        "Nhẫn đá xanh oval",
        "Nhẫn trái tim",
        "Nhẫn vương miện",
        "Nhẫn bản mảnh basic",
        "Nhẫn hoa trà",
        "Nhẫn đính pha lê",
        "Nhẫn bạc mở",
        "Nhẫn ngôi sao",
        "Nhẫn đá đen",
        "Nhẫn sóng biển",
        "Nhẫn lá olive",
        "Nhẫn mặt trăng",
        "Nhẫn chuỗi hạt",
        "Nhẫn tennis mini",
        "Nhẫn chữ V",
    ],
};

const PALETTES = {
    "vong-tay": ["#fff7ed", "#facc15", "#f59e0b", "#fef3c7"],
    "day-chuyen": ["#f8fafc", "#d4af37", "#b45309", "#fff7ed"],
    "khuyen-tai": ["#fdf2f8", "#f9a8d4", "#be185d", "#fff1f2"],
    nhan: ["#f8fafc", "#e5e7eb", "#64748b", "#ffffff"],
};

const slugify = (text) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const escapeXml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const productShape = (categorySlug, accent, dark, detailIndex) => {
    const sparkle =
        detailIndex % 2 === 0
            ? '<circle cx="620" cy="210" r="12" fill="#fff" opacity=".9"/><circle cx="660" cy="250" r="7" fill="#fff" opacity=".8"/>'
            : '<circle cx="180" cy="260" r="10" fill="#fff" opacity=".85"/><circle cx="215" cy="220" r="6" fill="#fff" opacity=".75"/>';

    if (categorySlug === "vong-tay") {
        return `
            <ellipse cx="400" cy="480" rx="210" ry="150" fill="none" stroke="${accent}" stroke-width="30"/>
            <ellipse cx="400" cy="480" rx="142" ry="96" fill="none" stroke="#fff" stroke-width="18" opacity=".92"/>
            <circle cx="250" cy="385" r="34" fill="#fff" stroke="${dark}" stroke-width="10"/>
            <circle cx="550" cy="385" r="34" fill="#fff" stroke="${dark}" stroke-width="10"/>
            <circle cx="400" cy="320" r="28" fill="#fff" stroke="${accent}" stroke-width="9"/>
            ${sparkle}
        `;
    }

    if (categorySlug === "day-chuyen") {
        return `
            <path d="M180 210 C230 420 570 420 620 210" fill="none" stroke="${accent}" stroke-width="26" stroke-linecap="round"/>
            <path d="M235 235 C280 360 520 360 565 235" fill="none" stroke="#fff" stroke-width="12" opacity=".7"/>
            <path d="M400 445 L465 560 L400 640 L335 560 Z" fill="#fff" stroke="${dark}" stroke-width="12"/>
            <circle cx="400" cy="552" r="30" fill="${accent}" opacity=".95"/>
            ${sparkle}
        `;
    }

    if (categorySlug === "khuyen-tai") {
        return `
            <circle cx="300" cy="330" r="82" fill="none" stroke="${accent}" stroke-width="24"/>
            <circle cx="500" cy="330" r="82" fill="none" stroke="${accent}" stroke-width="24"/>
            <path d="M300 420 C278 490 278 535 300 592" fill="none" stroke="${dark}" stroke-width="18" stroke-linecap="round"/>
            <path d="M500 420 C522 490 522 535 500 592" fill="none" stroke="${dark}" stroke-width="18" stroke-linecap="round"/>
            <circle cx="300" cy="610" r="26" fill="#fff" stroke="${accent}" stroke-width="8"/>
            <circle cx="500" cy="610" r="26" fill="#fff" stroke="${accent}" stroke-width="8"/>
            ${sparkle}
        `;
    }

    return `
        <ellipse cx="400" cy="520" rx="190" ry="125" fill="none" stroke="${accent}" stroke-width="34"/>
        <ellipse cx="400" cy="520" rx="124" ry="78" fill="none" stroke="#fff" stroke-width="20" opacity=".95"/>
        <path d="M400 250 L490 365 L400 455 L310 365 Z" fill="#fff" stroke="${dark}" stroke-width="12"/>
        <path d="M400 284 L455 365 L400 424 L345 365 Z" fill="${accent}" opacity=".78"/>
        ${sparkle}
    `;
};

const createSvgDataUri = ({ categorySlug, productName, detailIndex }) => {
    const [bg, accent, dark, soft] = PALETTES[categorySlug] || PALETTES.nhan;
    const angle = 20 + detailIndex * 8;
    const zoom = detailIndex === 0 ? 1 : 1.08 + detailIndex * 0.025;
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${bg}"/>
                    <stop offset="100%" stop-color="${soft}"/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#0f172a" flood-opacity=".18"/>
                </filter>
            </defs>
            <rect width="800" height="1000" fill="url(#bg)"/>
            <circle cx="680" cy="120" r="170" fill="#ffffff" opacity=".45"/>
            <circle cx="120" cy="840" r="220" fill="#ffffff" opacity=".38"/>
            <g transform="translate(400 500) rotate(${angle}) scale(${zoom}) translate(-400 -500)" filter="url(#shadow)">
                ${productShape(categorySlug, accent, dark, detailIndex)}
            </g>
            <text x="400" y="905" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#334155">${escapeXml(productName)}</text>
            <text x="400" y="946" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="3" fill="#64748b">ACCESSORIES AHIHI</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const buildDescription = ({ name, category, material, color }) => `
    <p><strong>${name}</strong> thuộc danh mục ${category.name}, thiết kế thanh lịch để dùng hằng ngày hoặc làm quà tặng.</p>
    <ul>
        <li>Chất liệu: ${material.name}</li>
        <li>Màu sắc: ${color}</li>
        <li>Bề mặt được hoàn thiện sáng, dễ phối với nhiều phong cách.</li>
        <li>Bảo quản nơi khô ráo, tránh tiếp xúc trực tiếp với hóa chất.</li>
    </ul>
`;

const getRequiredProducts = (categories, materials) => {
    const products = [];

    CATEGORY_CONFIG.forEach((categoryConfig, categoryIndex) => {
        const category = categories.find((item) => item.slug === categoryConfig.slug);
        const names = CATALOG[categoryConfig.slug].slice(0, TARGET_PER_CATEGORY);

        names.forEach((name, productIndex) => {
            const material = materials[(productIndex + categoryIndex) % materials.length];
            const color = COLORS[(productIndex + categoryIndex) % COLORS.length];
            const slug = slugify(`${name}-${categoryConfig.slug}`);
            const price = 320000 + categoryIndex * 45000 + productIndex * 35000;
            const imageSet = getProductImageSet(categoryConfig.slug, productIndex);

            products.push({
                name,
                slug,
                category,
                material,
                color,
                price,
                brand: BRANDS[(productIndex + categoryIndex) % BRANDS.length],
                quantity: 35 + ((productIndex * 7 + categoryIndex) % 85),
                sold: (productIndex * 5 + categoryIndex * 9) % 60,
                feature_image_url: imageSet.urls[0],
                imageSet,
                description: buildDescription({ name, category, material, color }),
            });
        });
    });

    return products;
};

const syncLookupTable = async (Model, items, transaction) => {
    for (const item of items) {
        const row = await Model.findOne({
            where: { slug: item.slug },
            transaction,
        });

        if (row?.id) {
            await Model.update(item, {
                where: { id: row.id },
                transaction,
            });
        } else {
            await Model.create(item, { transaction });
        }
    }
};

const syncImages = async (productId, product, transaction) => {
    await db.Image.destroy({
        where: {
            target_id: productId,
            target_type: "product",
        },
        transaction,
    });

    const images = product.imageSet.urls.map((imageUrl, imageIndex) => {
        return {
            target_id: productId,
            target_type: "product",
            public_id: `local-products/${product.slug}/${product.imageSet.fileNames[imageIndex].replace(/\.jpg$/i, "")}`,
            secure_url: imageUrl,
            thumbnail_url: imageUrl,
        };
    });

    await db.Image.bulkCreate(images, { transaction });
};

const syncProducts = async () => {
    const transaction = await db.sequelize.transaction();

    try {
        await syncLookupTable(db.Category, CATEGORY_CONFIG.map(({ slug, name }) => ({ slug, name })), transaction);
        await syncLookupTable(db.Material, MATERIALS, transaction);
        await syncLookupTable(
            db.Color,
            COLORS.map((name) => ({ name, slug: slugify(name) })),
            transaction,
        );

        // A transaction uses one PostgreSQL connection, so run its queries
        // sequentially instead of issuing concurrent client.query() calls.
        const categories = await db.Category.findAll({ raw: true, transaction });
        const materials = await db.Material.findAll({ raw: true, transaction });
        const existingProducts = await db.Product.findAll({ order: [["id", "ASC"]], transaction });
        const referencedRows = await db.sequelize.query(
            "select distinct product_id from order_details where product_id is not null",
            {
                type: db.sequelize.QueryTypes.SELECT,
                transaction,
            },
        );

        const activeCategories = categories.filter((category) =>
            CATEGORY_CONFIG.some((item) => item.slug === category.slug),
        );
        const activeMaterials = materials.filter((material) =>
            MATERIALS.some((item) => item.slug === material.slug),
        );
        const referencedProductIds = new Set(referencedRows.map((row) => Number(row.product_id)));
        const requiredProducts = getRequiredProducts(activeCategories, activeMaterials);
        const existingBySlug = new Map(existingProducts.map((product) => [product.slug, product]));
        const usedProductIds = new Set();
        const now = new Date();
        let created = 0;
        let updated = 0;
        let deleted = 0;

        for (let index = 0; index < requiredProducts.length; index += 1) {
            const product = requiredProducts[index];
            const productBySlug = existingBySlug.get(product.slug);
            const reusableProduct =
                productBySlug && !usedProductIds.has(productBySlug.id)
                    ? productBySlug
                    : existingProducts.find((item) => !usedProductIds.has(item.id));
            const payload = {
                name: product.name,
                slug: product.slug,
                category: product.category.name,
                material: product.material.name,
                brand: product.brand,
                color: product.color,
                price: product.price,
                feature_image_url: product.feature_image_url,
                description: product.description,
                quantity: product.quantity,
                sold: product.sold,
                updatedAt: now,
            };

            if (reusableProduct) {
                await db.Product.update(payload, {
                    where: { id: reusableProduct.id },
                    transaction,
                });
                usedProductIds.add(reusableProduct.id);
                await syncImages(reusableProduct.id, product, transaction);
                updated += 1;
            } else {
                const createdProduct = await db.Product.create(
                    {
                        ...payload,
                        createdAt: now,
                    },
                    { transaction },
                );
                usedProductIds.add(createdProduct.id);
                await syncImages(createdProduct.id, product, transaction);
                created += 1;
            }
        }

        const extraProducts = existingProducts.filter((product) => !usedProductIds.has(product.id));
        for (const product of extraProducts) {
            if (referencedProductIds.has(product.id)) {
                const replacement = requiredProducts[product.id % requiredProducts.length];
                await db.Product.update(
                    {
                        name: `${replacement.name} phiên bản đặc biệt`,
                        slug: `${replacement.slug}-don-hang-${product.id}`,
                        category: replacement.category.name,
                        material: replacement.material.name,
                        brand: replacement.brand,
                        color: replacement.color,
                        price: replacement.price,
                        feature_image_url: replacement.feature_image_url,
                        description: replacement.description,
                        quantity: replacement.quantity,
                        sold: replacement.sold,
                        updatedAt: now,
                    },
                    {
                        where: { id: product.id },
                        transaction,
                    },
                );
                await syncImages(product.id, replacement, transaction);
                updated += 1;
            } else {
                await db.Image.destroy({
                    where: {
                        target_id: product.id,
                        target_type: "product",
                    },
                    transaction,
                });
                await db.Product.destroy({
                    where: { id: product.id },
                    transaction,
                });
                deleted += 1;
            }
        }

        await db.Category.destroy({
            where: {
                slug: {
                    [db.Sequelize.Op.notIn]: CATEGORY_CONFIG.map((category) => category.slug),
                },
            },
            transaction,
        });

        await transaction.commit();

        const summary = await db.sequelize.query(
            `
            select c.id, c.slug, c.name, count(p.id)::int as product_count
            from categories c
            left join products p on p.category in (c.id::text, c.name, c.slug)
            group by c.id, c.slug, c.name
            order by c.id
            `,
            { type: db.sequelize.QueryTypes.SELECT },
        );
        const imageSummary = await db.sequelize.query(
            `
            select count(*)::int as detail_images
            from images
            where target_type = 'product'
            `,
            { type: db.sequelize.QueryTypes.SELECT },
        );

        return {
            created,
            updated,
            deleted,
            summary,
            detail_images: imageSummary[0]?.detail_images || 0,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

syncProducts()
    .then(async (result) => {
        console.log(JSON.stringify(result, null, 2));
        await db.sequelize.close();
    })
    .catch(async (error) => {
        console.error({
            message: error.message,
            databaseMessage: error.parent?.message,
            detail: error.parent?.detail,
            code: error.parent?.code,
        });
        await db.sequelize.close();
        process.exit(1);
    });
