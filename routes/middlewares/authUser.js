const jwt = require('jsonwebtoken');
const User = require('../../model/userModel.js');

const authUser = async(req, res, next) => {
    try {
        const token = req.cookies.token //|| req.header('Authorization')?.replace('Bearer ', '');
        console.log("Token:", token);
        
        if (!token) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", tokenVerified); // Log entire token payload

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "User not authenticated" });
        }
        
        const userId = tokenVerified; // Change 'user' to 'id'
        console.log("Extracted User ID from Token:", userId);

        const user = await User.findById(userId);
        console.log("User Found:", user); // Check if user is found

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error("Error in authUser:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

module.exports = authUser;
