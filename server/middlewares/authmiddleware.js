const jwt = require('jsonwebtoken');

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication token is required" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decode; 
        next();
    } catch (error) {
        console.error("Error in requireSignIn middleware:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

const isAdmin = (req, res, next) => {
    try {
        if (req.user.name !== process.env.ADMIN_NAME) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only.",
            });
        }
        next(); 
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { requireSignIn, isAdmin };
