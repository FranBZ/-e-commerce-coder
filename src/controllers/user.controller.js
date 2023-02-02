/* ++++++++++++++++++++++++++++++++
+  Controladores de los usuarios  +
++++++++++++++++++++++++++++++++++*/

const UserService = require('../services/user.service.js')
const userService = UserService.getInstance()

const signup = async (req, res) => {
    try {
        await userService.signup(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

const signin = async (req, res) => {
    try {
        await userService.signin(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

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