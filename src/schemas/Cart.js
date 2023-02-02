/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE LOS CARRITOS EN MONGODB +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const { Schema, model } = require("mongoose")

const cartCollection = 'carts'

const cartSchema = Schema({
    products: {
        type: Array,
    },
    email: {
        type: String,
        required: true
    },
    adresse : {
        type: String,
        require: true
    }
},{
    timestamps: true,
    versionKey: false
})

exports.Cart = model(cartCollection, cartSchema)