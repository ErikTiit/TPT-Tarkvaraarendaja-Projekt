# README for the frontend part of the praktika(project).

This repository contains the frontend part of the praktika project.

The techstack used for this project is the following: 
Backend - Express+drizzle
Frontend - React(vite)

<h1>Environment Variables</h1>

This project uses environment variables for configuration. Create a .env file in the Frontend directory of your project and add the following:

```
VITE_PORTBACKEND=3000
VITE_PORTFRONTEND=5173
VITE_URL=http://localhost
VITE_OFFERSAPI=$VITE_URL:$VITE_PORTBACKEND/api/offers
VITE_STUDENTAPI=$VITE_URL:$VITE_PORTBACKEND/api/student
VITE_COMPANIESAPI=$VITE_URL:$VITE_PORTBACKEND/api/companies
VITE_CHECKAUTHAPI=$VITE_URL:$VITE_PORTBACKEND/check-auth
VITE_LOGINAPI=$VITE_URL:$VITE_PORTBACKEND/api/student/user-login
```

## First Time Setup

To get started with this project, follow these steps:

1. Install Node.js (minimum version 18.18.1).

2. Open the terminal

3. Navigate to the frontend directory:

   ```
   cd frontend
   ```

4. Install the dependencies:

   ```
   npm install
   ```

5. Start the development server:

   ```
   npx vite
   ```

6. vite shortcuts :

   
  press r to restart the server
  press u to show server url
  press o to open in browser
  press c to clear console
  press q to quit
  


## Acknowledgments

- This project was created as part of an internship program.
