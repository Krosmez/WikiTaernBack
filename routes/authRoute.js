const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const checkDuplicate = require("../middleware/checkDuplicate");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshToken");
const local = require('dotenv/config');
const {config, refreshToken} = require("../config/token");

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

        const accessToken = await jwt.sign({
            email // => not secure, data is sensitive
        },process.env.SECRET_TOKEN, {
        })
        newUser.save(err => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.json({
                accessToken
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
        const user = await User.findOne({ email });
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
        const xsrfToken = crypto.randomBytes(64).toString('hex');

        const accessToken = await jwt.sign({ // That will generate a token
            email: user.email, xsrfToken  // => not fully secure, data is sensitive
        }, config.accessToken.secret, {
            algorithm: config.accessToken.algorithm,
            audience: config.accessToken.audience,
            expiresIn: config.accessToken.expiresIn / 1000, // Le délai avant expiration exprimé en seconde
            issuer: config.accessToken.issuer,
            subject: email.toString()
        });
        const refreshToken = generateRefreshToken(email);

        await refreshToken.save();

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge:config.accessToken.expiresIn
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: config.refreshToken.expiresIn,
            path: '/token'
        });

        //res.status(200).send
        res.json({
            accessTokenExpiresIn: config.accessToken.expiresIn,
            refreshTokenExpiresIn: config.refreshToken.expiresIn,
            xsrfToken
        })
    } catch (err) {
        res.status(500).json({
            message: "test"
        })
    }
})

function generateRefreshToken(email){
    return new RefreshToken({
        email: email,
        token: refreshToken,
        expiresAt: Date.now() + config.refreshToken.expiresIn
    });
};

module.exports = authRouter