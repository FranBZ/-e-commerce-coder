const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) res.render("error", { status: '403', error: `Acceso denegado ${error}`})
    try {
        const validUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = validUser
        next()
    } catch (error) {
        res.render("error", { status: '403', error: `Acceso denegado ${error}`})
    }
}

module.exports = { verifyToken }