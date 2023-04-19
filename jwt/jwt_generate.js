const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET
console.log(SECRET)
function generateAccessToken(role, email, is_verified) {
    return jwt.sign({role, email, is_verified}, SECRET, { expiresIn: '36000s' });
}

module.exports = {
    generateAccessToken
}