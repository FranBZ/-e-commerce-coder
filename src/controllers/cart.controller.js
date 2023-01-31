
const CartService = require('../services/cart.service.js')
const cartService = CartService.getInstance()

const getCartById = async (req, res) => {
    try {
        await cartService.getCartById(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const saveCart = async (req, res) => {    // Esta funcion guarda un carrito nuevo
    try {
        await cartService.saveCart(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const deleteCartById = async (req, res) => {   // Esta funcion elimina un carrito segun su ID
    try {
        await cartService.deleteCartById(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const getProductsFromCart = async (req, res) => { // Esta funcion muestra todos los productos de un carrito
    try {
        await cartService.getProductsFromCart(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const saveProductInCartByID = async (req, res) => { // Esta funcion guarda un producto en un carrito
    try {
        await cartService.saveProductInCartByID(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const deleteProductFromCartByID = async (req, res) => { // Esta funcion borra un producto de un carrito
    try {
        await cartService.deleteProductFromCartByID(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = {
    getCartById,
    saveCart,
    deleteCartById,
    getProductsFromCart,
    saveProductInCartByID,
    deleteProductFromCartByID
}