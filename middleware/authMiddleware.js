/* Module to handle session authentication and role authorization */

const jwt = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.jwt_secret;

// Function to sign JWT token
function createToken(payload, option) {
    return jwt.sign(payload, secretKey, option);
}

// Function to verify JWT token
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return null;
    }
}

// Function to authenticate JWT session token
function authenticateSession(req, res, next) {
    const token = req.cookies.authToken; 
    if (!token) {
        return res.redirect('/home');

    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.redirect('/home');
    }
    req.user = decoded; 
    next();
}

// Function to check for librarian role
function authorizeLibrarian(req, res, next) {
    if (req.user.role !== "librarian") {
      return res.redirect('/unauthorized');
    }
    next();
  }
  

// Function to check for member role
function authorizeMember(req, res, next) {
    if (req.user.role !== "member") {
      return res.redirect('/unauthorized');
    }
    next();
  }
module.exports = { createToken, authenticateSession, authorizeLibrarian, authorizeMember };
  