import pool from '../db';

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

export const getUserByUsername = async (username: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0] || null;
};

export const createUser = async (username: string, password: string): Promise<User> => {
  const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
  return result.rows[0];
};
