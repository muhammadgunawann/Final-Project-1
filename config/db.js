const Pool = require("pg").Pool;

const db = new Pool({
    "user": "ahmad",
    "host": "localhost",
    "database": "db_api",
    "password": "password",
    "port": 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;