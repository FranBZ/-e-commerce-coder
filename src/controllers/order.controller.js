const OrderService = require('../services/order.service.js')
const orderService = OrderService.getInstance()

const getOrders = async (req, res) => {
    try {
        await orderService.getOrders(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

const getOrderByid = async (req, res) => {
    try {
        await orderService.getOrderById(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

const generateOrder = async (req, res) => {
    try {
        await orderService.generateOrder(req, res)
    } catch (error) {
        res.status(404).json({ error })
    }
}

module.exports = {
    getOrders,
    getOrderByid,
    generateOrder
}