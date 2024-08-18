const jwt = require('jsonwebtoken');
const authStoreVender = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ success: false, message: "Vender not authenticated" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);


        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "Vender not authenticated" });
        }

        if (tokenVerified.role !== "vender" ) {
            return res.status(400).json({ message: "user not authenticated not Vender" });
        }
        res.json({ success: true, message: "Vender authenticated", user });
        req.user = tokenVerified;
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports = authStoreVender