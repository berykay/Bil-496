import pool from '../config/sql.js';

export default async function handler(req, res) {
  try {
    const connection = await pool.getConnection();
    res.status(200).json({ message: 'Veritabanına Başarıyla Bağlandı!' });
    connection.release();
  } catch (error) {
    res.status(500).json({ message: 'Veritabanına Bağlanılamadı', error: error.message });
  }
}