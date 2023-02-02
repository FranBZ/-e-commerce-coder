/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++
+  Servicio de comunicación con la base de datos Mongo  +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const mongoose = require('mongoose')
const { dbsConfig } = require('../config/dbsConnect.js')

mongoose.connect(dbsConfig.mongodbAtlas.uri, dbsConfig.mongodbAtlas.options)

class MongoConteiner {
    
    constructor(model) {
        this.collection = model
    }

    async getById (id) {
        try {
            const data = await this.collection.find({ '_id': id })
            if (data.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                return data
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async getAll () {
        try {
            let data = await this.collection.find({}).lean()
            return data
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save (obj) {
        try {
            const info = await this.collection.create(obj)
            return info
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async updateById (obj) {
        try {
            const { n, nModified } = await this.collection.replaceOne({ "_id": obj._id }, obj)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                return obj
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async deleteById (id) {
        try {
            const { n, nDeleted } = await this.collection.deleteOne({ _id: id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}

module.exports = MongoConteiner