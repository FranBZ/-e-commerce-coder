/* +++++++++++++++++++++++
+  Rutas de las ordenes  +
+++++++++++++++++++++++++*/

const { Router } = require('express') 
const { getOrders, getOrderByid, generateOrder } = require('../controllers/order.controller.js')

const orderRouter = Router()

// Me permite listar todas las ordenes existentes (es necesario un token validado para consultar esta ruta)
orderRouter.get('/', getOrders)

// Me permite listar una orden por su ID (es necesario un token validado para consultar esta ruta)
orderRouter.get('/:id', getOrderByid)

// Me permite generar una orden, el id a proporcionar debe ser el del carrito que va a ser comprado (es necesario un token validado para consultar esta ruta)
orderRouter.post('/:id', generateOrder)

module.exports = orderRouter