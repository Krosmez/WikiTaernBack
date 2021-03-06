/**
 * Token configuration.
 * @module config/token
 */

/**
 * Initialize the configuration.
 * @param {Object} env - The environment variables.
 */
const local = "dotenv/config";
require(local);

module.exports = {
    accessToken: {
        type: process.env.ACCESS_TOKEN_TYPE || 'Bearer',
        algorithm: process.env.ACCESS_TOKEN_ALGORITHM || 'HS256',
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        audience: process.env.ACCESS_TOKEN_AUDIENCE,
        issuer: process.env.ACCESS_TOKEN_ISSUER
    },
    refreshToken: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    }
};