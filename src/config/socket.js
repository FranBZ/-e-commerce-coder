const { io } = require('../app.js')

const ChatService = require('../services/chat.service.js')
const UserService = require('../services/user.service.js')

io.on('connection', async socket => {
    console.log('a user conected')

    const userService = UserService.getInstance()
    const usersINFO = await userService.returnUsers()
    
    const chatService = ChatService.getInstance()
    const chat = await chatService.readChat()

    socket.emit('server_all_menssage', { chat, usersINFO })

    socket.on('client_new_message', async data => {
        const userService = UserService.getInstance()
        const usersINFO = await userService.returnUsers()
        await chatService.insertMessage(data)
        const chat = await chatService.readChat()
        io.sockets.emit('server_all_menssage', { chat, usersINFO })
    })
})