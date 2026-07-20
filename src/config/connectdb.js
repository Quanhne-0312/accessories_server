var sequelize = require("../models").sequelize;

const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));

var connectDatabase = async function ({ retries = 5, retryDelayMs = 2000 } = {}) {
    for (let attempt = 1; attempt <= retries; attempt += 1) {
        try {
            await sequelize.authenticate();
            console.log("Connected successfully on port", process.env.NODE_DATABASE_PORT);
            return sequelize;
        } catch (error) {
            console.error(`Database connection attempt ${attempt}/${retries} failed:`, error.message);

            if (attempt === retries) {
                throw error;
            }

            await wait(retryDelayMs);
        }
    }
};

module.exports = connectDatabase;
