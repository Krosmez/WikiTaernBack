const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const checkDuplicate = require("../middleware/checkDuplicate");
const User = require("../models/userModel");
const local = require('dotenv/config');

// require(local);

authRouter.post('/signup', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password").isLength({ min: 6 }),
    checkDuplicate
], async (req, res) => {
    const { password, email } = req.body;

    // Validate Input
    const errors = validationResult(req)
    // Check if there's errors
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // Save User with hashed Pwd
    const hashPwd = await bcrypt.hash(password, 10)
    const newUser = new User({
        email,
        password: hashPwd
    })

    const token = await jwt.sign({
        email // => not secure, data is sensitive

    }, process.env.SECRET_JWT_KEY, {
        expiresIn: 36000
    })
    newUser.save(err => {
        if (err) { res.status(500).send({ message: err }); return; }
        res.json({
            token
        })
    })
});

authRouter.post("/login", [
    check("email", "Please provide a valid email").isEmail()
], async (req, res) => {
    const { password, email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                "errors": [{ "message": "Invalid credentials" }]
            })
        }

        const token = await jwt.sign({ // That will generate a token
            // "id": user._id,
            email // => not fully secure, data is sensitive
        }, process.env.SECRET_JWT_KEY, {
            expiresIn: "30d"
        })

        res.status(200).send({
            id: user._id,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

module.exports = authRouter