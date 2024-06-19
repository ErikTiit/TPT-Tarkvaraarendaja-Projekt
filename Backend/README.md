# README for the backend part of the praktika(project).

This repository contains the backend part of the praktika project.

The techstack used for this project is the following:
Backend - Express+drizzle
Frontend - React(vite)

## First Time Setup

To get started with this project, follow these steps:

1. Install MySQL locally server and workbench | Full

   1.1 Open MySQL Workbench

   1.1.1 MAKE SURE TO USE THE ROOT PASSWORD : Passw0rd OR CHANGE THE PASSWORD IN SCHEMA.JS

   1.2 Right click on an empty field in the navigator tab

   1.3 Click on create schema

   1.4 Name the schema a2

   1.5 Choose default charset utf8mb4

   1.6 Choose default collation unicode utf8mb4_unicode_520_ci or the 1st utf8mb4-unicode

2. Navigate to backend directory

3. Navigate to the backend directory:

   ```
   cd backend
   ```

4. Copy `.env.example` and rename it to `.env`

5. Install the dependencies:

   ```
   npm install
   ```

6. Run migration:

   ```
   npm run migrate
   ```

## Running local server

   npm start

## Updating database

Generate new migration:

   npm run generate


5.1 Press CTRL + C in the terminal and write "y"

```
npm run migrate
```

## Acknowledgments

- This project was created as part of an internship program.

```

```
