const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');

// Create a User using: POST "/api/auth/". Doesn't require Auth

router.post('/', [
    body('name', 'Enter valid name').isLength({ min: 5 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password must be strong and atleast 8 character').isLength({ min: 8 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
        .catch((error) => {
            console.log(error);
            res.json({ 
                error: "Enter unique value",
                message: error.message
            });
        });
})

module.exports = router;