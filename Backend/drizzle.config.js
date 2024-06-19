/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./database/schema.js",
    out: "./database/migrations",
    driver: 'mysql2'
};