import { Request, Response } from 'express';
import { User, getUserByUsername } from '../models/userModel';
import bcrypt from 'bcryptjs';
import pool from '../db';

export const updateProfile = async (req: Request, res: Response) => {
  const user = req.user as User;
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await pool.query(
    'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *',
    [username, hashedPassword, user.id]
  );
  res.json(updatedUser.rows[0]);
};
