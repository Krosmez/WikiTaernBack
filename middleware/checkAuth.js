const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { secret, algorithm } = require('../config/token');

module.exports = async (req, res, next) => {

    try {
        const { cookies, headers } = req;
        if (!cookies || !cookies.access_token ) {
            return res.status(401).json({ message: 'Missing token in cookie' });
        }

        const accessToken = cookies.access_token;

        if (!headers || !headers['x-xsrf-token']) {
            return res.status(401).json({ message: "Missing XSRF token in headers"});
        }

        const xsrfToken = headers['x-xsrf-token'];

        const decodedToken = jwt.verify(accessToken, secret, {
            algorithms: algorithm
        });

        if (xsrfToken !== decodedToken.xsrfToken) {
            return res.status(401).json({ message: 'Bad xsrf token' });
        }

        const userEmail = decodedToken.sub;
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            return res.status(401).json({ message: `Email ${userEmail} not exists` });
        }

        req.user = user;

        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Internal error' });
    }
}
   /* if (!token) {
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
} */