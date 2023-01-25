const UserService = require('../services/user.service.js')
const userService = UserService.getInstance()

// Registrando usuario
const signup = async (req, res) => {
    try {
        await userService.signup(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

// Logueando usuario
const signin = async (req, res) => {
    try {
        await userService.signin(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

// Funcion para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        await userService.getUsers(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

module.exports = {
    signup,
    signin,
    getUsers,
}