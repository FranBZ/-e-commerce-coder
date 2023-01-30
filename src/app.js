const express = require('express')
const { Server: HTTPserver } = require('http')
const { Server: IOserver } = require('socket.io')

const userRouter = require('./routes/user.routes.js')
const chatRouter = require('./routes/chat.routes.js')
const authRouter = require('./routes/auth.routes.js')
const productRouter = require('./routes/product.routes.js')
const cartRouter = require('./routes/cart.routes.js')

const { join } = require('path')

const app = express()
const http = new HTTPserver(app)
const io = new IOserver(http)
module.exports = { io }

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
app.use('/products', productRouter)
app.use('/cart', cartRouter)

// Socket
require('./config/socket.js')

// Inicio
const main = http.listen(PORT, () => {
    console.log('Servidor on - port', PORT)
})

main.on('error', error => console.log(error))