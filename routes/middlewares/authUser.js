const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "user not authenticated" }, user);
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "user not authenticated" });
        }
        
        req.user = tokenVerified;
        res.json({ success: true, message: "User authenticated", user });res.json({ success: true, message: "User authenticated", user });
        
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports = authUser