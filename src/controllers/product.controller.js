const ProductService = require('../services/product.service.js')
const productService = ProductService.getInstance()

const getProducts = async (req, res) => {
    try {
        await productService.getProducts(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const getProductById = async (req, res) => {
    try {
        await productService.getProductById(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const getProductByCategory = async (req, res) => {
    try {
        await productService.getProductByCategory(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const saveProduct = async (req, res) => {
    try {
        await productService.saveProduct(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const updateProductByID = async (req, res) => {
    try {
        await productService.updateProductByID(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const deleteProductById = async (req, res) => {
    try {
        await productService.deleteProductById(req, res)
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProductByCategory,
    saveProduct,
    updateProductByID,
    deleteProductById
}