import pool from '../db';

export interface Entry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  user_id: number;
  photo?: string;
}

export const getEntriesByUserId = async (userId: number): Promise<Entry[]> => {
  const result = await pool.query('SELECT * FROM entries WHERE user_id = $1', [userId]);
  return result.rows;
};

// export const createEntry = async (entry: Omit<Entry, 'id'>): Promise<Entry> => {
//   const result = await pool.query(
//     'INSERT INTO entries (title, content, category, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//     [entry.title, entry.content, entry.category, entry.date, entry.user_id]
//   );
//   return result.rows[0];
// };
// Update createEntry to include the photo field
export const createEntry = async (entry: Omit<Entry, 'id'>): Promise<Entry> => {
  const result = await pool.query(
    'INSERT INTO entries (title, content, category, date, user_id, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [entry.title, entry.content, entry.category, entry.date, entry.user_id, entry.photo]
  );
  return result.rows[0];
};

// export const updateEntry = async (id: number, entry: Omit<Entry, 'id' | 'user_id'>): Promise<Entry> => {
//   const result = await pool.query(
//     'UPDATE entries SET title = $1, content = $2, category = $3, date = $4 WHERE id = $5 RETURNING *',
//     [entry.title, entry.content, entry.category, entry.date, id]
//   );
//   return result.rows[0];
// };
// Update updateEntry to include the photo field
export const updateEntry = async (id: number, entry: Omit<Entry, 'id' | 'user_id'>): Promise<Entry> => {
  const result = await pool.query(
    'UPDATE entries SET title = $1, content = $2, category = $3, date = $4, photo = $5 WHERE id = $6 RETURNING *',
    [entry.title, entry.content, entry.category, entry.date, entry.photo, id]
  );
  return result.rows[0];
};

export const deleteEntry = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM entries WHERE id = $1', [id]);
};
