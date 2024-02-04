import pool from "../../config/database.js";

export default async function showUsers(req, res) {
  try {
    const dbConnection = await pool.getConnection();
    const [rows] = await dbConnection.query("SELECT * FROM Users");
    res.status(200).json({ users: rows });
    dbConnection.release();
  } catch (error) {
    res.status(500).json({ message: "Veritabanına Bağlanılamadı", error: error.message });
  }
}