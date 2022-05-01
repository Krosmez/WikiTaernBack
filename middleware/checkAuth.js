const jwt = require("jsonwebtoken");
const local = require('dotenv/config');

// require(local);

module.exports = async (req, res, next) => {

    const token = req.header("token");

    if (!token) {
        return res.status(400).json({
            "headers": [req.headers],
            "errors": [{ "message": "No token found" }]
        })
    }
    try {
        let user = await jwt.verify(token, process.env.SECRET_JWT_KEY) // Steel need to make it secure
        req.user = user.email;

        next()
    } catch (error) {
        return res.status(400).json({
            "errors": [{ "message": "Token invalid" }]
        })
    }
}