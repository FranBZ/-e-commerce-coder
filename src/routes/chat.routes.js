const { Router } = require('express')
const { showChatByEmail } = require('../utils/showChatByEmail.js')

const chatRouter = Router()

// Soporte
chatRouter.get('/', (req, res) => res.render('chatSuport'))
chatRouter.get('/:email', showChatByEmail)

module.exports = chatRouter