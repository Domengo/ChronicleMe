CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(255),
  date TIMESTAMP NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

-- Update the users table
ALTER TABLE users 
ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE,
ADD COLUMN phone VARCHAR(20),
ADD COLUMN first_name VARCHAR(255),
ADD COLUMN last_name VARCHAR(255),
ADD COLUMN country VARCHAR(100);

-- Update the entries table
ALTER TABLE entries 
ADD COLUMN photo TEXT; -- Storing the photo URL as a string (You can adjust the data type as needed)
