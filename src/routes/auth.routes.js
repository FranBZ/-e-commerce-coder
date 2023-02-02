/* +++++++++++++++++++++++++
+  Rutas de autenticación  +
+++++++++++++++++++++++++++*/

const { Router } = require('express')
const { signin, signup } = require('../controllers/user.controller.js')

const authRouter = Router()

// Login
authRouter.get('/', (req, res) => res.render('login'))
authRouter.post('/login', signin)

// Registro
authRouter.get('/register', (req, res) => res.render('register'))
authRouter.post('/register', signup)

module.exports = authRouter