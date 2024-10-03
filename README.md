# Pokémon Web App

## Project Overview

This project is a web application built using a **mobile-first** approach. The application interacts with **PokéAPI** to display Pokémon data and a custom backend to manage user-related actions such as catching, renaming, and releasing Pokémon.

This project was undertaken to fulfill the requirements of the Backend Developer test for Kkuljaem Korean, despite being a full-stack developer project.

## Project Structure

- **Backend:** Node.js, JavaScript, Express.js, Joi (validation), JWT (authentication), MySQL2 (database), Bcrypt (password encryption), Domain Driven Design (DDD)
- **Frontend:** Node.js, TypeScript, React.js, Vite, TailwindCSS, Shadcn/UI, Tanstack Query
- **Database:** MySQL
- **API Documentation:** Postman export can be found in `/backend` folder
- **Note:** Redux was attempted but was not fully implemented

## Backend Endpoints

| Method | Endpoint                                  | Description                              |
| ------ | ----------------------------------------- | ---------------------------------------- |
| POST   | {{url}}/user/register                     | Register User                            |
| POST   | {{url}}/user/login                        | Login User                               |
| GET    | {{url}}/user/profile                      | Get User Data                            |
| GET    | {{url}}/api/pokemon/all?limit=10&offset=0 | Get All Pokémon                          |
| GET    | {{url}}/api/pokemon/detail/:idname        | Get Pokémon by ID or Name                |
| POST   | {{url}}/api/my-pokemon/catch/:id          | Catch a Pokémon                          |
| POST   | {{url}}/api/my-pokemon/set-nickname/:id   | Set nickname for Pokémon                 |
| POST   | {{url}}/api/my-pokemon/rename/:id         | Rename Pokémon (Fibonacci sequence)      |
| POST   | {{url}}/api/my-pokemon/release/:id        | Release Pokémon (Prime number condition) |
| GET    | {{url}}/api/my-pokemon/all                | Get All Pokémon Owned by User            |
| GET    | {{url}}/api/my-pokemon/detail/:id         | Get Pokémon owned by user by ID          |

## Frontend Pages

| No. | Page Name                 | Description                                                                                                                             |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Pokémon List              | Displays a list of Pokémon fetched from PokéAPI.                                                                                        |
| 2   | Pokémon Details           | Displays detailed information of a selected Pokémon, including moves, types, and a feature to **catch** the Pokémon (50% success rate). |
| 3   | User Profile Modal/Dialog | A user profile modal where users can view their information.                                                                            |
| 4   | My Pokémon List           | Displays all caught Pokémon owned by the user, fetched from the backend.                                                                |
| 5   | My Pokémon Detail         | Shows details of a specific caught Pokémon, with options to **rename** and **release** the Pokémon.                                     |

# Getting Started

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alifmaulidanar/kkuljaem-backend-test.git
   cd kkuljaem-backend-test
   ```

2. Set up the database:

   - Import the MySQL database dump file located at `/backend/database/pokemon_db_dump.sql`.
   - Ensure your database credentials are correctly set in the backend environment file.

   To import the SQL dump, you can run the following command from your terminal:

   ```bash
   mysql -u [your_usernam]e -p[your_password] pokemon_db < /backend/database/pokemon_db_dump.sql
   ```

3. Run the application:

   - Backend:

     1. Navigate to the `/backend` directory.
     2. Install backend dependencies:

     ```bash
     npm install
     ```

     3. Import the Postman collection file on `/backend` named **Kkuljaem_Pokemon_API.postman_collection.json**
     4. Run the backend using Nodemon:

     ```bash
     npm run start
     ```

     The backend will be available at `http://localhost:8080`.

   - Frontend:

     1. Navigate to the `/frontend` directory.
     2. Install frontend dependencies:

     ```bash
     npm install
     ```

     3. Start the Vite development server:

     ```bash
     npm run dev
     ```

     The frontend will be available at `http://localhost:3000`.

## Sample Users

To quickly get started and test the application, you can use the following sample user credentials:

| Username      | Email          | Password    |
| ------------- | -------------- | ----------- |
| trainer_ash   | ash@poke.com   | password123 |
| trainer_misty | misty@poke.com | password456 |
| trainer_brock | brock@poke.com | password789 |

Feel free to log in using these accounts to test the Pokémon-catching features, view your Pokémon, and rename or release them.

## Features Implemented from Requirements:

1. **Web App**
2. **Three main pages:** Pokémon List, Pokémon Detail, My Pokémon List
3. **PokéAPI integration**
4. **Catch Pokémon feature:** With 50% probability on the Pokémon Detail page
5. **Nickname feature:** After catching a Pokémon, the user can give it a nickname
6. **My Pokémon List:** Displays all caught Pokémon with nicknames
7. **My Pokémon Detail:** Shows information about a caught Pokémon, and supports renaming and releasing
   - **Renaming:** Pokémon name is modified using Fibonacci sequence
   - **Releasing:** Pokémon is released only if the API returns a prime number

## Requirements Not Met:

1. **Microservices or Containerization**
2. **Redux**
3. **Global state management**
