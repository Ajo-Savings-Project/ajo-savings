

import dotenv from "dotenv";

dotenv.config();

const { DEV_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } =
    process.env;

export default {
    PORT: DEV_PORT,
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
};
// console.log(DEV_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT ); ====>database connection debugging

console.log("running in development mode");