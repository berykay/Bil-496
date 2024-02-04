const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '34.163.134.173',
  user: 'root',
  password: '123456bbbB',
  database: 'bitirme',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;