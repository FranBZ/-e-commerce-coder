const { config } = require('dotenv')

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DE CONECCION A LAS DIFERENTES BASE DE DATOS +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

config()

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_ATLAS_ENDPOINT,
} = process.env

const dbsConfig = {
    mongodbAtlas: {
        uri: `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}${MONGO_ATLAS_ENDPOINT}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}

module.exports = { dbsConfig }