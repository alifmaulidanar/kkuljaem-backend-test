import db from "../config/database.js";

// Check if user already exists (by email)
export const getUserByEmail = async (email) => {
  return db.query("SELECT * FROM user WHERE email = ?", [email]);
};

// Register new user
export const insertUser = async (username, email, hashedPassword) => {
  return db.query(
    "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
};
