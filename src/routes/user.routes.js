const { Router } = require('express')
const { getUsers } = require('../controller/user.controller.js')
const { verifyToken } = require('../middlewares/validateToken.js')

const userRouter = Router()

// Users
userRouter.get('/:id?', verifyToken, getUsers)

module.exports = userRouter