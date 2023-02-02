/* +++++++++++++++++++
+  Servicio de Chat  +
+++++++++++++++++++++*/

const { Chat } = require('../schemas/Chat.js')
const MongoConteiner = require('../database/mongo.js')

class ChatService extends MongoConteiner {

    static instance

    constructor() {
        super(Chat)
    }

    static getInstance() {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService()
        }
        return ChatService.instance
    }

    async readChat() { // Lee todo los mensajes y los devuelve
        try {
            const chatInfo = await super.getAll()
            return chatInfo
        } catch (error) {
            throw new Error(`Error al leer el mensaje ${error}`)
        }
    }

    async insertMessage(data) { // Guarda un mensaje

        const { email, date, message } = data

        if (email && date && message) {
            try {
                const newMessage = new Chat({ email, date, message })
                await super.save(newMessage)
            } catch (error) {
                throw new Error(`Error al insertar el mensaje ${error}`)
            }
        } else {
            throw new Error(`Se deben ingresar todos los campos`)
        }
    }
}

module.exports = ChatService