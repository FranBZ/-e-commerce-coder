const { Router } = require('express')
const { getUsers } = require('../controllers/user.controller.js')
const { verifyToken } = require('../middlewares/validateToken.js')

const userRouter = Router()

// Users
userRouter.get('/:id?', getUsers)

module.exports = userRouter