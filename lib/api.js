const express = require('express');
const router = express.Router();
const User = require('./models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

// Express JWT instantiating with secret in env
const jwtMW = expressJWT({
    secret: process.env.SECRET
});

//  Validate the token
router.get('/validate_token', jwtMW, (req, res) => {
    res.json({ success: true, user: req.user });
});

// Login api
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            success: false,
            error: 'Provide all the required data'
        });
    }
    else {
        User.findOne({
            where: {
                email
            }
        }).then((user) => {
            if (user == null) {
                res.status(401).json({
                    success: false,
                    error: 'Username/Password is incorrect'
                });
            }
            else {
                if (verifyHash(password, user.password)) {
                    const userData = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                    const token = jwt.sign(userData, process.env.SECRET, {
                        expiresIn: 2592000
                    });
                    res.json({
                        success: true,
                        token,
                        error: null
                    });
                }
                else {
                    res.status(401).json({
                        success: false,
                        error: 'Username/Password is incorrect'
                    });
                }
            }
        });
    }
});

// Register api handler
router.post('/register', (req, res) => {
    const { email, firstName, lastName, password, password2, date, gender } = req.body;
    if ((!email || !firstName || !lastName || !password || !password2 || !date || !gender) || !validateEmail(email) || !(password === password2)) {
        res.status(400).json({
            success: false,
            error: 'Bad data or data not provided'
        });
    }
    else {
        User.findOne({
            where: {
                email
            }
        }).then((user) => {
            if (user == null) {
                const newUser = {
                    email,
                    password: hashPassword(password),
                    firstName: capitalizeFirstLetter(firstName),
                    lastName: capitalizeFirstLetter(lastName),
                    birthday: date,
                    gender
                };
                User.create(newUser).then(() => {
                    res.status(201).json({
                        success: true,
                        error: null
                    });
                });
            }
            else {
                res.status(403).json({
                    success: false,
                    error: 'Email already in use'
                });
            }
        });
    }
});


/**
 * Helper Functions for api
 */

// Create password hash using Password based key derivative function 2. sync function
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$');
}

// Checking the password hash. sync function
function verifyHash(password, original) {
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];

    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

    if (hash === originalHash)
        return true;
    else
        return false;
}

// For checking the email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// To make the first character of name uppercase
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router;