const { Product } = require('../schemas/Product.js')
const MongoConteiner = require('../database/mongo.js')

class ProductService extends MongoConteiner {

    static instance

    constructor() {
        super(Product)
    }

    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService()
        }
        return ProductService.instance
    }

    async getProducts(req, res) {  //  Devuelve todos los productos de la DB
        try {
            const products = await super.getAll()
            res.status(200).send(products)
        } catch (error) {
            res.status(404).json({ error: `Error al consultar todos los productos - ${error}` })
        }
    }

    async getProductById(req, res) { // Devuelve un producto por su ID
        const { id } = req.params
        try {
            if (id) {
                const product = await super.getById(id)
                if (product) {
                    res.status(200).send(product)
                } else {
                    res.status(400).json({ error: 'No existe un producto con ese ID' })
                }
            } else {
                res.status(400).json({ error: 'Es necesario proporcionar un ID' })
            }
        } catch (error) {
            res.status(404).json({ error: `Error al consultar producto por id - ${error}` })
        }
    }

    async getProductByCategory(req, res) {  // Devuelve todos los productos que pertenezcan a una misma categoria
        const { type } = req.params
        try {
            if (type) {
                const allProducts = await super.getAll()
                const productsByCategory = allProducts.filter(product => product.category == type)
                if (productsByCategory.length == 0) {
                    res.status(400).json({ error: 'No existen productos dentro de la categoria indicada' })
                } else {
                    res.status(200).send(productsByCategory)
                }
            } else {
                res.status(400).json({ error: 'Es necesario proporcionar una categoria' })
            }
        } catch (error) {
            res.status(404).json({ error: `Error al consultar productos por categoria - ${error}` })
        }
    }

    async saveProduct(req, res) { // Guarda un producto en la DB

        const { name, price, urlImage, description, category } = req.body

        if (!name || !price || !urlImage || !description || !category) {
            res.status(400).json({ message: 'Por favor ingrese todos los datos del producto' })
        } else {

            const product = req.body
            try {
                await super.save(product)
                res.status(201).json({ messaje: 'Producto creado con exito' })
            } catch (error) {
                res.status(400).json({ error: `Error al crear un producto - ${error}` })
            }

        }
    }

    async updateProductByID(req, res) {  // Actualiza un producto segun su ID

        const { id } = req.params
        const { name, price, urlImage, description, category } = req.body

        if (!name || !price || !urlImage || !description || !category) {
            res.status(400).json({ error: 'Por favor ingrese todos los datos del producto para poder actualizarlo' })
        } else {
            try {
                const product = await super.getById(id)
                if (product) {
                    product[0]
                    product[0].name = name
                    product[0].price = price
                    product[0].urlImage = urlImage
                    product[0].description = description
                    product[0].category = category
                    await super.updateById(product[0])
                    res.status(201).json({ messaje: 'Producto actualizado con exito' })
                } else {
                    res.status(400).json({ error: 'No se ha encontrado un producto con ese ID' })
                }
            } catch (error) {
                res.status(400).json({ error: `Error al intentar actualizar el producto - ${error}` })
            }
        }

    }

    async deleteProductById(req, res) {  // Elimina un producto segun su ID

        const { id } = req.params
        try {
            const product = await super.getById(id)
            if (product) {
                await super.deleteById(id)
                res.status(200).json({ messaje: 'Producto borrado con exito' })
            } else {
                res.status(400).json({ error: 'No existe un producto con ese ID' })
            }
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

}

module.exports = ProductService