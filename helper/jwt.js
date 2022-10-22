const jwt = require("jsonwebtoken");
const KEY = "03102000";

const generateToken = payload => {
    const token = jwt.sign(payload, KEY);
    return token;
};


const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, KEY);
        return decode;

    } catch (error) {
        return console.info(error.message);
        throw {
            code: 401,
            message: "unauthorized"
        }
    }
}

module.exports = {
    generateToken,
    verifyToken
}