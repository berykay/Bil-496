import pool from "../../config/database.js";

export default async function databaseConnectionControl(req, res) {
  try {
    const dbConnection = await pool.getConnection();
    res
      .status(200)
      .json({ message: "Veritabanına Başarıyla Bağlandı!", req: req.method });
    dbConnection.release();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına Bağlanılamadı", error: error.message });
  }
}
