# Encrypted-Data-Storage
Encrypted password storage using bcryptjs

## What I did
Implemented secure password hashing using bcrypt.js in a MERN stack app.

## Tools Used
- Node.js, Express.js, MongoDB, Mongoose
- bcryptjs

## How it works
- Registration: Password hashed with bcrypt (salt rounds=10) before storing in DB
- Login: bcrypt.compare() checks plain password against stored hash

## Key Concepts Learned
- Never store plain text passwords
- Salt prevents rainbow table attacks
- bcrypt is slow by design (brute force protection)

## How to Run
1. npm install
2. Add .env file with MONGO_URI and PORT
3. node server.js
