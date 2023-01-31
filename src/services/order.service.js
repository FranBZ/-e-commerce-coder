const MongoConteiner = require('../database/mongo.js')
const { Order } = require('../schemas/Order.js')

const CartService = require('../services/cart.service.js')
const cartService = CartService.getInstance()

const { buyEmail } = require('../utils/sendEmail.js')

class OrderService extends MongoConteiner {

    static instance

    constructor() {
        super(Order)
    }

    static getInstance() {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService()
        }
        return OrderService.instance
    }

    async getOrders(req, res) {
        try {
            const orders = await super.getAll()
            res.status(200).send(orders)
        } catch (error) {
            res.status(400).json({ error: `Error al listar las ordenes - ${error}` })
        }
    }

    async getOrderById(req, res) {
        const { id } = req.params
        if (id) {
            try {
                const order = await super.getById(id)
                res.status(200).send(order)
            } catch (error) {
                res.status(400).json({ error: `Error al listar orden por ID ${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporcionar un ID' })
        }
    }

    async generateOrder(req, res) {
        const { id } = req.params

        if (id) {
            try {
                const cart = await cartService.getById(id)
                const orderService = OrderService.getInstance()
                const orders = await orderService.getAll()
                const order = await super.save({
                    items: cart[0].products,
                    orderNumber: orders.length + 1,
                    email: cart[0].email,
                    adresse: cart[0].adresse
                })
                await buyEmail(order)
                await cartService.deleteById(id)
                res.status(200).json({ message: `orden generada con exito` })
            } catch (error) {
                res.status(400).json({ error: `Error al generar la orden ${error}` })
            }
        } else {
            res.status(400).json({ error: 'Debe proporcionar un ID' })
        }
    }
}

module.exports = OrderService