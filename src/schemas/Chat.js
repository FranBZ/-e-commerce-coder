const { Schema, model } = require('mongoose')

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE Los chats EN MONGODB +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const chatCollection = 'chat'

const chatSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, {
    timestamps: false,
    versionKey: false
})

exports.Chat = model(chatCollection, chatSchema)