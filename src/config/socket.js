/* ++++++++++++++++++++++++++++
+  Soket - Lado del servidor  +
++++++++++++++++++++++++++++++*/

const { io } = require('../app.js')

const ChatService = require('../services/chat.service.js')
const UserService = require('../services/user.service.js')

io.on('connection', async socket => {
    console.log('a user conected')

    // Solicitud de la información en la primera conección al chat
    const userService = UserService.getInstance()
    const usersINFO = await userService.returnUsers()
    
    const chatService = ChatService.getInstance()
    const chat = await chatService.readChat()

    // Envío de información de los chats y los usarios
    socket.emit('server_all_menssage', { chat, usersINFO })

    // Recepcion y envío de información de un nuevo mensaje en el chat
    socket.on('client_new_message', async data => {
        const userService = UserService.getInstance()
        const usersINFO = await userService.returnUsers()
        await chatService.insertMessage(data)
        const chat = await chatService.readChat()
        io.sockets.emit('server_all_menssage', { chat, usersINFO })
    })
})