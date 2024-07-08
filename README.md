# Personal Journaling App

## Project Overview

The Personal Journaling App is a mobile application built with React Native and Expo, designed to allow users to write journal entries, categorize them, and view a summary of their entries. The app includes user authentication and a backend service built with Node.js, Express, and MySQL.

## Table of Contents

- [Personal Journaling App](#personal-journaling-app)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
    - [Example Request](#example-request)
    - [Usage](#usage)
    - [Contributing](#contributing)

## Features

- **User Authentication**: Users can sign up and log in.
- **Journal Entry Management**: Users can add, edit, and delete journal entries.
- **Journal View**: Users can view a list of all their journal entries.
- **Categorization**: Users can categorize their entries (e.g., Personal, Work, Travel).
- **Summary View**: Users can view a summary of journal entries over selected periods (daily, weekly, monthly).
- **Settings**: Users can update their username and password.

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Node.js, Express, MySQL
- **Storage**: AsyncStorage (React Native)

## Installation

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Domengo/ChronicleMe.git
   cd ChronicleMe/backend
   ```

2. **Install dependencies**

```bash
npm install
```

3. **Create a .env file and add your environment variables**

```plaintext
PORT=5000
JWT_SECRET=your_jwt_secret
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=journalapp
```

4. **Set up the database**

Ensure your MySQL server is running and create the necessary database and tables:

```sql
CREATE DATABASE journalapp;

USE journalapp;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(255),
  date TIMESTAMP NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

5. **Start the server**

```bash
npm start
```

### Frontend Setup

1. **Navigate to the frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the Expo development server**

```bash
npm start
```

4. **Run the app on your device**

Use the Expo Go app to scan the QR code displayed in the terminal.

## API Documentation

### Endpoints

- User Authentication

  - POST /auth/register: Register a new user
  - POST /auth/login: Authenticate a user and return a JWT
- Journal Entries

  - GET /entries: Fetch all entries for a user (requires JWT)
  - POST /entries: Create a new journal entry (requires JWT)
  - PUT /entries/:id: Update an entry (requires JWT)
  - DELETE /entries/:id: Delete an entry (requires JWT)
- Profile

  - PUT /profile/update-profile: Update the user profile (requires JWT)

### Example Request

- Register

```bash
curl -X POST <http://localhost:5000/auth/register> \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword"
}'
```

- Login

```bash
curl -X POST <http://localhost:5000/auth/login> \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword"
}'
```

- Add Journal Entry

```
bash
curl -X POST <http://localhost:5000/entries> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{
  "title": "My First Entry",
  "content": "This is the content of my first entry.",
  "category": "Personal",
  "date": "2024-07-08"
}'
```

### Usage

1. **Run the Backend**
Ensure the backend server is running.

```bash
npm start
```

2. **Run the Frontend**
Start the Expo development server and use the Expo Go app to scan the QR code.

```bash
npx expo start
```

3. **Interact with the App**

- Register a new user and log in.
- Add, edit, and delete journal entries.
- View categorized journal entries.
- Update user profile settings.

### Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Make your changes
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature-branch)
6. Create a new Pull Request
