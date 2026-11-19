// Koneksi ke MySQL memakai Connection Pool (mysql2)
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'film_db',
  waitForConnections: true,
  connectionLimit: 10,
});

// .promise() supaya bisa pakai async/await
module.exports = pool.promise();