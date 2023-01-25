const express = require('express')
const { Server: HTTPserver } = require('http')
const { Server: IOserver } = require('socket.io')

const userRouter = require('./routes/user.routes.js')
const chatRouter = require('./routes/chat.routes.js')
const authRouter = require('./routes/auth.routes.js')

const ChatService = require('./services/chat.service.js')
const UserService = require('./services/user.service.js')

const { join } = require('path')

const app = express()
const http = new HTTPserver(app)
const io = new IOserver(http)

const PORT = process.env.PORT

// Configuracion
app.set('port', PORT)
app.set('view engine', '.ejs')
app.set('views', join(__dirname, 'views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public')))

// Rutas
app.use('/', authRouter)
app.use('/chat', chatRouter)
app.use('/users', userRouter)

/* app.use('/products', verifyToken, productsRouter)
app.use('/cart', verifyToken, cartRouter) */

// Socket
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

// Inicio
const main = http.listen(PORT, () => {
    console.log('Servidor on - port', PORT)
})

main.on('error', error => console.log(error))