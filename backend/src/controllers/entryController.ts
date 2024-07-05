import { Request, Response, NextFunction } from 'express';
import { createEntry, deleteEntry, getEntriesByUserId, updateEntry } from '../models/entryModel';

export const getEntries = async (req: Request, res: Response) => {
  const user = req.user;
  // const entries = await getEntriesByUserId(user?.id);
  // res.json(entries);
  if (typeof user !== 'undefined' && typeof user.id === 'number') {
    const entries = await getEntriesByUserId(user.id);
    res.json(entries);
  } else {
    console.log("user not found")
  }
};

export const addEntry = async (req: Request, res: Response) => {
  const user = req.user;
  const entry = await createEntry({ ...req.body, user_id: user?.id });
  res.status(201).json(entry);
};

export const editEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const entry = await updateEntry(parseInt(id, 10), req.body);
  res.json(entry);
};

export const removeEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteEntry(parseInt(id, 10));
  res.status(204).send();
};
