require('dotenv').config();

const webToken = require('jsonwebtoken');

const expiry_time = process.env.JWT_TOKEN_TIMEOUT;
const auth_key = process.env.JWT_KEY;

const newToken = (userData) => {

    return webToken.sign(userData, auth_key, { expiresIn: `${expiry_time}  seconds` });
}

const validateToken = (token) => {

    return webToken.verify(token, auth_key, (error, information) => {
        if (information) return information;
        return null;
    });
};

module.exports = { newToken, validateToken };