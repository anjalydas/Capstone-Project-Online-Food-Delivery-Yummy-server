const jwt = require('jsonwebtoken');
const User = require('../../model/userModel.js');

const authUser = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: "user not authenticated" });
        }
        
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "user not authenticated" });
        }
        
        req.user = tokenVerified;
        const user = await User.findById(tokenVerified.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
        res.json({ success: true, message: "User authenticated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
module.exports = authUser