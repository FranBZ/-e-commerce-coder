/* +++++++++++++++++++++++
+  Verificador de token  +
+++++++++++++++++++++++++*/

const jwt = require('jsonwebtoken')

// Esta función nos permitr verificar si los tokens son auténticos
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(403).json({ message: 'Acceso denegado'})
    try {
        const validUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = validUser
        next()
    } catch (error) {
        res.status(403).json({ message: 'Acceso denegado'})
    }
}

module.exports = { verifyToken }