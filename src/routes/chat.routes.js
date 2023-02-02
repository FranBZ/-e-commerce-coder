/*++++++++++++++++++
+  Rutas del chat  +
+++++++++++++++++++*/

const { Router } = require('express')
const { showChatByEmail } = require('../utils/showChatByEmail.js')

const chatRouter = Router()

// Soporte
chatRouter.get('/', (req, res) => res.render('chatSuport'))

// Historial de chat
chatRouter.get('/:email', showChatByEmail)

module.exports = chatRouter