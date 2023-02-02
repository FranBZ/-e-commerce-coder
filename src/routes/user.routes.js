/* ++++++++++++++++++++++++
+  Rutas de los usuarios  +
++++++++++++++++++++++++++*/

const { Router } = require('express')
const { getUsers } = require('../controllers/user.controller.js')

const userRouter = Router()

// Esta ruta devuleve todos los usuarios (es necesario un toquen validado para consultar esta ruta)
userRouter.get('/:id?', getUsers)

module.exports = userRouter