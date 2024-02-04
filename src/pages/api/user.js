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
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    const [users] = await dbConnection.query("SELECT * FROM User WHERE UserID = ?", [userID]);
    dbConnection.release();

    if (users.length > 0) {
      const user = users[0];
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (dbConnection) dbConnection.release();
    console.error("Database connection error:", error);
    return res.status(500).json({ message: "Database connection error", error: error.message });
  }
}


async function createUser(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let dbConnection;
  try {
    const { email } = req.body; // We expect to receive only the email in the body

    dbConnection = await pool.getConnection();

    const insertQuery = `
      INSERT INTO User (Email, NewUser) VALUES (?, TRUE)
    `;

    const [result] = await dbConnection.query(insertQuery, [email]);

    dbConnection.release();

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertId
    });
  } catch (error) {
    if (dbConnection) dbConnection.release();
    console.error("Failed to create user in the database:", error);
    return res.status(500).json({
      message: "Failed to connect to the database",
      error: error.message
    });
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
