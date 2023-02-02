/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE LAS ORDENES EN MONGODB +
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const { Schema, model } = require('mongoose')

const orderCollection = 'order'

const orderSchema = new Schema({
    items: {
        type: Array,
        require: true
    },
    orderNumber: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: 'generada'
    },
    email: {
        type: String,
        require: true
    },
    adresse: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
})

exports.Order = model(orderCollection, orderSchema)