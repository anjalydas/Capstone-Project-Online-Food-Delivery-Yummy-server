const jwt = require('jsonwebtoken');

const generateUserToken = (user) => {
    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role || 'user' }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    return token;
};
module.exports = generateUserToken;