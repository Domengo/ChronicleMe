import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByUsername, createUser } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  const { username, password, email, phone, country, firstName, lastName } =
    req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(
      username,
      email,
      phone,
      country,
      firstName,
      lastName,
      hashedPassword
    );
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
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
    { expiresIn: "2h" }
  );
  res.json({ token });
};
