# Easily Job Portal 🧑‍💼🚀

A full-stack job portal application built using **Node.js**, **Express.js**, and the **MVC architecture**. This platform allows users to register, log in, browse jobs, post jobs (for recruiters), and apply for jobs (for candidates) with resume upload functionality.

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templating)
- **Middleware**: Custom validation and authentication
- **Sessions & Cookies**: express-session, cookie-parser
- **File Uploads**: multer
- **Views**: EJS with express-ejs-layouts

## 📁 Folder Structure

Easily-Job-portal/
├── public/ # Static assets (CSS, images, etc.)
├── src/
│ ├── controller/ # Route controllers (Job, User, Applicant)
│ ├── middleware/ # Custom middleware (auth, file upload, validation)
│ ├── views/ # EJS templates
├── .gitignore
├── server.js (or index.js) # Main entry point

## 🚀 Features

- 🔐 User Authentication (register/login/logout)
- 📃 Post, Update, Delete Jobs (for logged-in recruiters)
- 🎯 Browse & Filter Jobs
- 📥 Apply to Jobs with Resume Upload
- 🗂️ View Applicants per Job
- 🍪 Session and Cookie Tracking
- 🛡️ Middleware-based validation
- 🧱 MVC project structure

## 🧪 Middleware Overview

- **auth.middleware.js**: Protects routes that require login
- **file.upload.middleware.js**: Handles resume upload with `multer`
- **Registervalidation.middleware.js**: Validates user registration input
- **jobApply.middleware.js**: Validates job application input
- **lastVisit.middleware.js**: Tracks the user's last visit via cookies

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/k-vaishnav/Easily-Job-portal.git
   cd Easily-Job-portal
##   Install dependencies

npm install

## Run the server

node server.js

## Open in browser

http://localhost:3200/

📌 **Endpoints Summary**


👤 **User Routes**
GET /login - Login page

POST /login - Authenticate user

POST /register - Register new user

GET /logout - Logout and clear session

💼 **Job Routes**
GET / - Home page (job list)

GET /jobs - All jobs

GET /jobs/:id - Job details

GET /postjob - Post job form

POST /jobs - Post new job

GET /job/update/:id - Update job form

POST /job/update/:id - Update job

POST /job/delete/:id - Delete job

GET /jobs/filter - Filter/search jobs

📄 **Applicant Routes**
**GET /job/applicants/:id** - View applicants

**POST /job/applicants/:id** - Apply to job


📜**License**
This project is licensed under the MIT License.

🙌 **Acknowledgements**
Node.js Docs

Express.js Docs

EJS Documentation

Multer for file uploads

✨ **Author**
Komal Vaishnav
