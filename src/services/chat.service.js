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

    async readChat() {
        try {
            const chatInfo = await super.getAll()
            return chatInfo
        } catch (error) {
            res.render("error", { status: '404', error: `Error al leer el chat ${error}`})
        }
    }

    async insertMessage(data) {

        const { email, date, message } = data

        try {
            const newMessage = new Chat({ email, date, message})
            await super.save(newMessage)
        } catch (error) {
            res.render("error", { status: '404', error: `Error al insertar el mensaje ${error}`})
        }
    }
}

module.exports = ChatService