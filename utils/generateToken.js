const jwt = require('jsonwebtoken');

const generateUserToken = (email, role) => {
    const token = jwt.sign({ _id: user._id, email: email, role: role || 'user' }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    return token;
};
module.exports = generateUserToken;