const { Router } = require('express')
const { signin, signup, getUsers } = require('../controller/user.controller.js')
const { verifyToken } = require('../middlewares/validateToken.js')

const userRouter = Router()

// Login
userRouter.get('/', (req, res) => res.render('login'))
userRouter.post('/login', signin)

// Registro
userRouter.get('/register', (req, res) => res.render('register'))
userRouter.post('/register', signup)

// Soporte
userRouter.get('/suport', (req, res) => res.render('chatSuport'))

// Users
userRouter.get('/users', verifyToken, getUsers)

module.exports = userRouter