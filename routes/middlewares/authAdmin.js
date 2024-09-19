const jwt = require('jsonwebtoken');
const User = require('../../model/userModel.js');
const authAdmin = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ success: false, message: "user not authenticated" }, );
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (tokenVerified.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied. Admins only" });
        }
        res.json({ success: true, message: "Admin authenticated", User });
        req.user = tokenVerified;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    
    }
};
module.exports = authAdmin;