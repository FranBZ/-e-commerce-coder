const { Router } = require('express')
const {
    getCartById, 
    saveCart, 
    deleteCartById, 
    getProductsFromCart, 
    saveProductInCartByID, 
    deleteProductFromCartByID
} = require('../controllers/cart.controller.js')

const cartRouter = Router()

// Esta ruta devuelve un carrito por su ID (es necesario un token valido para consultar esta ruta)
cartRouter.get('/:id', getCartById)

// Se debe proporcionar un ID de cliente al cual se le asignara un carrito, esta ruta devuelve el ID de carrito (ese necesario un token validado para consultar esta ruta)
cartRouter.post('/:userId', saveCart)

// Me permite listar todos los productos guardados en el carrito por su ID de carrito (ese necesario un token validado para consultar esta ruta)
cartRouter.get('/:id/products', getProductsFromCart)

// Incorporar productos a un carrito. Es necesario proporcionar el ID del carrito al que se van a incorporar los productos 
// y el ID del producto que se desea agregar (ese necesario un token validado para consultar esta ruta)
cartRouter.post('/:idCart/product/:idProd', saveProductInCartByID)

// Eliminar productos de un carrito. Es necesario proporcionar el ID del carrito al que se van a quitar los productos 
// y el ID del producto que se desea quitar (ese necesario un token validado para consultar esta ruta)
cartRouter.delete('/:idCart/product/:idProd', deleteProductFromCartByID)

// Elimina un carrito por su ID (ese necesario un token validado para consultar esta ruta)
cartRouter.delete('/:id', deleteCartById)

module.exports = cartRouter