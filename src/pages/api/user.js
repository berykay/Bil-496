import pool from '../../config/database'; 

export default async function handler(req, res) {
  const { userID } = req.query; 

  switch (req.method) {
    case 'GET':
      return getUser(req, res, userID);
    case 'POST':
      return createUser(req, res);
    case 'DELETE':
      return deleteUser(req, res, userID);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getUser(req, res, userID) {
  try {
    const dbConnection = await pool.getConnection();
    const [user] = await dbConnection.query("SELECT * FROM Users WHERE id = ?", [userID]);
    dbConnection.release();

    if (user.length > 0) {
      return res.status(200).json(user[0]);
    } else {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
  } catch (error) {
    dbConnection.release();
    return res.status(500).json({ message: "Veritabanına bağlanılamadı", error: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { name, email } = req.body; 
    const dbConnection = await pool.getConnection();
    const [result] = await dbConnection.query("INSERT INTO Users (name, email) VALUES (?, ?)", [name, email]);
    dbConnection.release();

    return res.status(201).json({ message: "Kullanıcı oluşturuldu", userId: result.insertId });
  } catch (error) {
    dbConnection.release();
    return res.status(500).json({ message: "Veritabanına bağlanılamadı", error: error.message });
  }
}

async function deleteUser(req, res, userID) {
  try {
    const dbConnection = await pool.getConnection();
    const [result] = await dbConnection.query("DELETE FROM Users WHERE id = ?", [userID]);
    dbConnection.release();

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Kullanıcı silindi" });
    } else {
      return res.status(404).json({ message: "Silinecek kullanıcı bulunamadı" });
    }
  } catch (error) {
    dbConnection.release();
    return res.status(500).json({ message: "Veritabanına bağlanılamadı", error: error.message });
  }
}
