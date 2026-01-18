
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: req.body.role || 'user'
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(401).json({
                message: 'Invalid credentails'
            })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {
            expiresIn: '15m'
        })

        res.json({ token })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const refreshToken = async (req, res) =>{
    try {
        const { token } = req.body

        if(!token) {
            return res.status(401).json({
                message: "Refresh token missing"
            })
        }

        const user = await User.findOne({ refreshToken: token})
        if(!user){
            return res.status(403).json({ message: "Invalid refresh token"})
        }

        const decoded = jwt.verify(token,  'Secret')

        const newAccessToken = jwt.sign(
            { id: decoded.id, role: user.role},
            'secret',
            { expiresIn: '15m'}
        )

        const newRefreshToken = jwt.sign(
            { id: decoded.id },
            'Secret',
            { expiresIn: '7d'}
        )

        user.refreshToken = newRefreshToken
        await user.save()

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    } catch (error) {
        res.status(403).json({
            message: "Invalid refresh token"
        })
    }
}

module.exports = { register, login, refreshToken }