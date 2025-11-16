import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "yamanote.proxy.rlwy.net",
    port: 26680,
    user: "root",
    password: "rXAxnsXBEIHcWKTdnPfRmXyQKArhKJDM",
    database: "railway",
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;
