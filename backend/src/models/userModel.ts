import pool from "../db";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
}

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0] || null;
};

// export const createUser = async (
//   username: string,
//   password: string
// ): Promise<User> => {
//   const result = await pool.query(
//     "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
//     [username, password]
//   );
//   return result.rows[0];
// };

export const createUser = async (
  username: string,
  password: string,
  email: string,
  phone: string,
  country: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (username, password, email, phone, country, first_name, last_name) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [username, password, email, phone, country, firstName, lastName]
  );
  return result.rows[0];
};
