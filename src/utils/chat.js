const fs = require('fs')

const leerChat = async () => {

    try {
        const data = await fs.promises.readFile('chat.txt', 'utf-8', (err, data) => {
            if(err) throw err
            return data
        })
        return JSON.parse(data) 

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const insertarChat = async mensaje => {

    try {
        const chat = await leerChat() 
        chat.push(mensaje)
        await fs.promises.writeFile('chat.txt', JSON.stringify(chat, null, 2), err => {
        if(err) throw err
    })

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

module.exports = { leerChat, insertarChat }