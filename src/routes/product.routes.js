const { Router } = require('express')
const {
    getProducts, 
    getProductById,
    getProductByCategory, 
    saveProduct, 
    updateProductByID, 
    deleteProductById 
} = require('../controllers/product.controller.js')

const productRouter = Router()

// Me permite listar todos los productos disponibles (ese necesario un token validado para consultar esta ruta)
productRouter.get('/', getProducts)

// Me permite listar un producto por su id (ese necesario un token validado para consultar esta ruta)
productRouter.get('/:id', getProductById)

// Me permite listar todos los productos disponibles por su categoria (ese necesario un token validado para consultar esta ruta)
// Para poder listar se debe pasar como parametro un tipo de categoria ej:  rutaRaiz/products/category/frutas
productRouter.get('/category/:type', getProductByCategory)

// Incorporar productos a la DB (ese necesario un token validado para consultar esta ruta)
productRouter.post('/', saveProduct)

// Actualiza un producto por su id (ese necesario un token validado para consultar esta ruta)
productRouter.put('/:id', updateProductByID)

// Borra un producto por su id (ese necesario un token validado para consultar esta ruta)
productRouter.delete('/:id', deleteProductById)

module.exports = productRouter