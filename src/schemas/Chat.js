/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE LOS CHATS EN MONGODB +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const { Schema, model } = require('mongoose')

const chatCollection = 'chat'

const chatSchema = new Schema({
    email: {
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