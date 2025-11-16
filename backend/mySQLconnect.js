const mysql = require("mysql2/promise");

const dbConfig = {
    host: "yamanote.proxy.rlwy.net",
    port: 26680,
    user: "root",
    password: "rXAxnsXBEIHcWKTdnPfRmXyQKArhKJDM",
    database: "railway",
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
};

async function testConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);

        // simpler query
        const [rows] = await connection.query("SELECT NOW()");
        console.log("✅ Connected successfully!");
        console.log("Database time:", rows[0]['NOW()']);

        await connection.end();
    } catch (err) {
        console.error("❌ Connection failed:", err.message);
    }
}

testConnection();

