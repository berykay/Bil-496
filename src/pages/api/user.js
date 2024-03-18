import pool from "../../config/database";

export default async function handler(req, res) {
  const { userID } = req.query;

  switch (req.method) {
    case "GET":
      return getUser(req, res, userID);
    case "POST":
      return createUser(req, res);
    case "PUT":
      return updateUser(req, res, userID);
    case "DELETE":
      return deleteUser(req, res, userID);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getUser(req, res, userID) {
  let dbConnection;
  try {
    dbConnection = await pool.getConnection();
    const query = "SELECT * FROM User WHERE UserID = ?";
    const [users] = await dbConnection.query(query, [userID]);
    dbConnection.release();

    if (users.length > 0) {
      const user = users[0];
      const goal = await getUserGoal(dbConnection, userID);
      const allergies = await getUserAllergies(dbConnection, userID);
      const location = await getUserLocation(dbConnection, userID);
      user.Goal = goal[0].GoalName;
      user.Allergies = allergies;
      user.Country = location[0].Country;
      user.City = location[0].City;
      return res.status(200).json(user, goal, allergies, location);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (dbConnection) dbConnection.release();
    return res
      .status(500)
      .json({ message: "Database connection error", error: error.message });
  }
}

async function createUser(req, res) {
  console.log("Creating user in the database");
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let dbConnection;
  console.log("!Creating user in the database");
  try {
    console.log("Creating user in the database");
    const { uid, email } = req.body;

    dbConnection = await pool.getConnection();

    const insertQuery = `
      INSERT INTO User (UserID, Email) VALUES (?, ?)
    `;

    const [result] = await dbConnection.query(insertQuery, [uid, email]);

    dbConnection.release();

    return res.status(201).json({
      message: "User created successfully",
      userId: uid,
    });
  } catch (error) {
    if (dbConnection) dbConnection.release();
    console.error("Failed to create user in the database:", error);
    return res.status(500).json({
      message: "Failed to connect to the database",
      error: error.message,
    });
  }
}

async function deleteUser(req, res, userID) {
  try {
    const dbConnection = await pool.getConnection();
    const [result] = await dbConnection.query(
      "DELETE FROM Users WHERE id = ?",
      [userID]
    );
    dbConnection.release();

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Kullanıcı silindi" });
    } else {
      return res
        .status(404)
        .json({ message: "Silinecek kullanıcı bulunamadı" });
    }
  } catch (error) {
    dbConnection.release();
    return res
      .status(500)
      .json({ message: "Veritabanına bağlanılamadı", error: error.message });
  }
}

async function updateUser(req, res, userID) {
  if (!userID) {
    return res.status(400).json({ message: "UserID is required" });
  }

  let dbConnection;
  try {
    const {
      fullName,
      gender,
      age,
      height,
      weight,
      goal,
      activityLevel,
      dietPreference,
      allergies,
      country,
      state,
      otherGoal
    } = req.body;
    console.log(req.body);

    dbConnection = await pool.getConnection();

    await updateUserGoal(otherGoal, goal, dbConnection, userID);

    if (allergies) {
      for (let i = 0; i < allergies.length; i++) {
        const allergyIdQuery = `SELECT AllergenID FROM Allergen WHERE AllergenName = ?`;
        let [allergyId] = await dbConnection.query(allergyIdQuery, [
          allergies[i],
        ]);
        allergyId = allergyId.length > 0 ? allergyId[0].AllergenID : [];
        if (allergyId.length === 0) {
          const addNewAllergyIdQuery = ` INSERT INTO Allergen (AllergenName) VALUES (?)`;
          const [result] = await dbConnection.query(addNewAllergyIdQuery, [
            allergies[i],
          ]);
          allergyId = result.insertId;
        }
        if (!ownAllergies.includes(allergies[i])) {
          const userAllergyQuery = `INSERT INTO UserAllergy (UserID, AllergenID) VALUES (?, ?)`;
          const [result] = await dbConnection.query(userAllergyQuery, [
            userID,
            allergyId,
          ]);
        }
      }
    }

    const updateQuery = `
      UPDATE User SET
      Username = ?, Gender = ?, Age = ?, Height = ?, Weight = ?, ActivityLevel = ?
      WHERE UserID = ?
    `;

    const [result] = await dbConnection.query(updateQuery, [
      fullName,
      gender,
      age,
      height,
      weight,
      activityLevel,
      userID,
    ]);

    dbConnection.release();

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (dbConnection) dbConnection.release();
    console.error("Failed to update user:", error);
    return res.status(500).json({
      message: "Failed to update user in the database",
      error: error.message,
    });
  }
}

async function updateUserGoal(otherGoal, goal, dbConnection, userID) {
  let newGoal = goal;
  if(otherGoal){
    newGoal = otherGoal;
  }
  let goalId = null;
  let insertedGoalId = null;
  if (newGoal) {
    const goalIdQuery = `SELECT GoalID FROM Goal WHERE GoalName = ?`;
    [goalId] = await dbConnection.query(goalIdQuery, [goal]);

    if (goalId.length === 0) {
      const addNewGoalIdQuery = ` INSERT INTO Goal (GoalName) VALUES (?)`;
      [insertedGoalId] = await dbConnection.query(addNewGoalIdQuery, [goal]);
    }
    const userGoal = insertedGoalId ? insertedGoalId.insertId : goalId[0].GoalID;

    const userGoalQuery = `UPDATE User SET GoalID = ? WHERE UserID = ?`;
    const [resultGoal] = await dbConnection.query(userGoalQuery, [userGoal, userID]);
  }
}

async function getUserGoal(dbConnection, userID) {
  const userGoalQuery = `SELECT GoalName FROM Goal JOIN User ON User.GoalID = Goal.GoalID WHERE User.UserID = ?`;
  const [goal] = await dbConnection.query(userGoalQuery, [userID]);
  if (goal.length > 0) {
    return goal;
  }
  return null;
}

async function getUserAllergies(dbConnection, userID) {
  const userAllergiesQuery = `SELECT AllergenName FROM Allergen JOIN UserAllergy ON UserAllergy.AllergenID = Allergen.AllergenID WHERE UserAllergy.UserID = ?`;
  const [allergies] = await dbConnection.query(userAllergiesQuery, [userID]);
  if (allergies.length > 0) {
    return allergies;
  }
  return null;
}

async function getUserLocation(dbConnection, userID) {
  const userLocationQuery = `SELECT Country, City FROM Region JOIN User ON User.RegionID = Region.RegionID WHERE User.UserID = ?`;
  const [location] = await dbConnection.query(userLocationQuery, [userID]);
  if (location.length > 0) {
    console.log("Location:", location);
    return location;
  }
  return null;
}



