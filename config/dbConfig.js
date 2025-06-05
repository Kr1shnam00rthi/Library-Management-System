/* Module to configure the connection for MySQL server */

const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 10
}).promise(); 

// Function to test the connection
async function testConnection() {
    try {
        await db.query('SELECT 1');
        console.log('Connected to MySQL');
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}

testConnection();

module.exports = { db };