/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE USUARIOS EN MONGODB +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const usersCollection = 'user'

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true
    }
}, {
    timestamps: false,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

exports.User = model(usersCollection, userSchema)