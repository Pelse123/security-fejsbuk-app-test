# Project Overview
  This project is fullstack web aplication built with Express, React and MySQL to practice web security vulnerabilities and penetration testing

# Implemented Vulnerabilities (very simple)
  - Cross-Site Scripting (XSS)
    Endpoint:```/dodaj_post```
    User input is not sanitized before being rendered in the frontend.
    This allows injection of malicious JavaScript code

  - Insecure Direct Object Reference (IDOR)
    Endpoint:```/moje_konto/:id```
    The backend does not verify whether the authenticated user is authorized to access the requested resource.
    By modifying the id parameter, it is possible to access other users data.

  - Brute-Force Attack (Broken Authentication)
    Endpoint:```/logowanie```
    The login endpoint does not implement:
      - rate limiting
      - account lockout
      - request throttling
    This allows automated credential guessing using predefined username/email/passwords combination.

  ### All attacks are simulated with a Python scripts using the requests library

  # What I learned
  - How missing input validation leads to XSS
  - How lack of authorization checks causes IDOR
  - Why authentication endpoints require rate limiting
  - How to automate HTTP attacks using Python
  - How backend logic flaws create real security risks

# How to run
## 1. Database Setup (MYSQL XAMPP)
  - Make sure you have XAMPP installed and running MySQL
  - Open phpMyAdmin
  - Create new database 
  - import provided SQL files to set up
    
## 2. Backend (Express)
  - Navigate to the backend folder
  - Install required packages
 ```bash
npm install express cors mysql
```
  - Setup your database name (6th line)
  - Start the server
 ```bash
 node index.js
  ```
  - Server will run on
  ```http://localhost:8000```.
    
## 3. Frontend (React)
  - Navigate to the frontend folder
  - Make sure all frontend files are present
  - Install required packages
```bash
npm install react-router-dom bootstrap react-icons
```
  - Start the React app
  - The frontend will run on
```http://localhost:3000```.
    
## 4. Python Scripts (Bruteforce, XSS, IDOR)
  - Make sure you have Python 3 installed
  - Navigate to the folder of the script you want to run
  - Run the script using the Python interpreter
