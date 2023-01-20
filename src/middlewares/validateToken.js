const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({message: 'Acceso denegado'})
    try {
        const validUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = validUser
        next()
    } catch (error) {
        res.status(400).json({message: 'Acceso denegado'})
    }
}

module.exports = { verifyToken }