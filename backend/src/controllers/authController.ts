import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByUsername, createUser } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(username, hashedPassword);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  res.json({ token });
  
};
