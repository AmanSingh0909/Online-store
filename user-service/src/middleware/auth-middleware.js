const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header.authorization
        
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header missing'
            })
        }

        const token = authHeader.split(' ')[1]\

        if (!token) {
            return res.status(401).json({
                message: 'Token missing'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}