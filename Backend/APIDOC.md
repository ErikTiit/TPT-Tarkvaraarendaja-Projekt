# README for API.
THIS API FOLLOWS RESTFUL STANDARDS

## Starting the API 

To get started with the API, follow these steps:

1. Open the terminal

2. Navigate to middleware directory

   ```
   cd backend
   ```

3. start the API:

   ```
   node app.js
   ```

4. These are examples on how to use the API: 

-------------------------------------------------
THE CURRENT URL IS HTTP://LOCALHOST:3000 

API ENDPOINTS- 

/api/user FOR GET AND POST ONLY 
/api/user/id[HERE GOES THE ID OF THE SPECIFIC STUDENT] FOR PUT ONLY AND ALSO GET
/api/companies/id[HERE GOES THE ID OF THE SPECIFIC COMPANY] FOR PUT AND DELETE ONLY
/api/companies FOR POST ONLY
/api/offers FOR GET AND POST ONLY
/api/offers/id[HERE GOES THE ID OF THE SPECIFIC OFFER] FOR DELETE, PUT AND ALSO GET

--------------------------------------------------
EXAMPLES OF JSON ACCEPTED - 
POST OFFERS - 

   ```

{
  "comp_id": 123, // has to be similar to an existing comp_id
  "comp_name": "Acme Inc.",
  "comp_email": "info@acme.com",
  "comp_phone": "555-1234",
  "comp_RegNo": "456324",
  "app_position": "Backend Developer",
  "job_tags": "Node.js, Express, MongoDB",
  "job_workField": "Tallinnasdas",
  "job_description": "We are looking for a talented backend developer to join our team.",
  "app_qualifications": "Bachelor's degree in Computer Science or related field, 2+ years of experience in backend development",
  "job_location": "San Francisco, CA",
  "job_salary": "$90,000 - $110,000",
  "job_term": "Full-time",
  "offer_exp_date": "2022-12-31"
}
    
   ```

POST COMPANIES - 

   ```
   {
      "comp_id": "123",
      "registryNo": "456324",
      "name": "Example Company",
      "email": "example@company.com",
      "password": "securepassword",
      "phone_num": "1234567890"
   }
   ```
POST USER - 

   ```
   {
    "name": "Student Name",
    "email": "student@example.com",
    "password": "studentPassword",
    "course": "Course Name"
    "role": "student"
   }
   ```
