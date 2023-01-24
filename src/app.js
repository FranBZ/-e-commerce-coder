const express = require('express')
const { Server: HTTPserver } = require('http')
const { Server: IOserver } = require('socket.io')
const userRouter = require('./routes/user.routes.js')
const { join } = require('path')
const { verifyToken } = require('./middlewares/validateToken.js')
const ChatService = require('./services/chatService.js')

const app = express()
const http = new HTTPserver(app)
const io = new IOserver(http)

const PORT = 8080

// Configuracion
app.set('port', PORT)
app.set('view engine', '.ejs')
app.set('views', join(__dirname, 'views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public')))

// Rutas
app.use('/', userRouter)
/* app.use('/products', verifyToken, productsRouter)
app.use('/cart', verifyToken, cartRouter) */

// Socket
io.on('connection', async socket => {
    console.log('a user conected')
    
    const chatService = ChatService.getInstance()
    const chatINFO = await chatService.readChat()

    socket.emit('server_all_menssage', chatINFO)

    socket.on('client_new_message', async data => {
        await chatService.insertMessage(data)
        io.sockets.emit('server_all_menssage', await chatService.readChat())
    })
})


// Inicio
const main = http.listen(PORT, () => {
    console.log('Servidor on - port', PORT)
})

main.on('error', error => console.log(error))