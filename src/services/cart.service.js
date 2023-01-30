const MongoConteiner = require("../database/mongo.js")
const { Cart } = require('../schemas/Cart.js')

const ProductService = require('../services/product.service.js')
const productService = ProductService.getInstance()

class CartService extends MongoConteiner {

    static instance

    constructor() {
        super(Cart)
    }

    static getInstance() {
        if (CartService.instance) {
            return CartService.instance;
        }
        CartService.instance = new CartService();
        return CartService.instance;
    }

    async getCartById(req, res) {  // Devuelve un carrito por su ID

        const { id } = req.params

        if (id) {
            try {
                const cart = await super.getById(id)
                if (cart) {
                    res.status(200).send(cart)
                } else {
                    res.status(400).json({ error: 'No existe un carrito con ese ID' })
                }
            } catch (error) {
                res.status(400).json({ error: `Error al consultar carrito por ID - ${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporcionar un ID' })
        }
    }

    async saveCart(req, res) {  // Guarda un carrito y devuelve su informacion

        const { userId } = req.params

        if (userId) {
            try {
                const info = await super.save({ products: [], userId })
                res.send(info)
            } catch (error) {
                res.status(400).json({ error: `Error al intentar guardar el carrito - ${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporcionar un userId' })
        }
    }

    async deleteCartById(req, res) {   // Elimina un carrito segun su ID

        const { id } = req.params

        if (id) {
            try {
                const cart = await super.getById(id)
                if (cart) {
                    await super.deleteById(id)
                    res.status(200).json({ mesagge: 'Carrito borrado con exito' })
                } else {
                    res.status(400).json({ error: 'No existe un carrito con ese ID' })
                }
            } catch (error) {
                res.status(400).json({ error: `Error al borrar carrito por ID${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporcionar un ID' })
        }
    }

    async getProductsFromCart(req, res) { // Esta funcion muestra todos los productos de un carrito

        const { id } = req.params

        if (id) {
            try {
                const cart = await super.getById(id)
                res.status(200).send(cart[0].products)
            } catch (error) {
                res.status(400).json({ error: `Error al mostrar productos del carrito${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporcionar un ID' })
        }
    }

    async saveProductInCartByID(req, res) { // Esta funcion guarda un producto en un carrito

        const { idCart, idProd } = req.params

        if (idCart && idProd) {
            try {
                const cart = await super.getById(idCart)
                if (cart) {
                    let product = await productService.getById(idProd)
                    cart[0].products.push(product[0])
                    await super.updateById(cart[0])
                    res.status(200).json({ messaje: 'Productos agregados con exito al carrito' })
                } else {
                    res.status(400).json({ error: 'No existe carrito con este ID' })
                }
            } catch (error) {
                res.status(400).json({ error: `No se pudo guardar el producto en el carrito - ${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporciona un ID de carrito y un ID de producto' })
        }
    }

    async deleteProductFromCartByID(req, res) { // Esta funcion borra un producto de un carrito

        const { idCart, idProd } = req.params

        if (idCart, idProd) {
            try {
                const cart = await super.getById(idCart)
                if (cart) {
                    const productIndex = cart[0].products.findIndex(product => product._id == idProd)
                    if (productIndex != -1) {
                        cart[0].products.splice(productIndex, 1)
                        await super.updateById(cart[0])
                        res.status(200).json({ messaje: 'Producto borrado con éxito' })
                    } else {
                        res.status(400).json({ error: 'Este producto no se encuentra en el carrito' })
                    }
                } else {
                    res.status(400).json({ error: 'No existe carrito con este ID' })
                }

            } catch (error) {
                res.status(400).json({ error: `Erro al intentar borrar producto del carrito - ${error}` })
            }
        } else {
            res.status(400).json({ error: 'Es necesario proporciona un ID de carrito y un ID de producto' })
        }
    }
}

module.exports = CartService