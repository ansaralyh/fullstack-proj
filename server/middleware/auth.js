const jwt = require('jsonwebtoken');
const config = require('../config');

// Auth middleware
const Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(403).json({
                message: 'Please login to access this resource'
            });
        } else {
            const { userId, username } = jwt.verify(token, config.JWT_SECRET);
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid Token' });
    }
};

// Local Variables middleware
function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
}

module.exports = { Auth, localVariables };
