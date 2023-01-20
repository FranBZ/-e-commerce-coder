const { createTransport } = require('nodemailer')

const buyEmail = async (pedido, usuario) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.TEST_MAIL,
            pass: process.env.TEST_MAIL_PASS
        }
    })

    let body = pedido.reduce((acu, ped) => {
        acu += `   <tr>
                        <td> ${ped.name} </td>
                        <td> ${ped.description} </td>
                        <td> ${ped.price} </td>
                    </tr>`
        return acu
    }, '')

    const mailOptions = {
        from: `Nodemailer - ${process.env.TEST_MAIL}`,
        to: process.env.TEST_MAIL,
        subject: `Nuevo pedido de: ${usuario}`,
        html: ` <table>
                    <thead>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                    </thead>
                    <tbody>${body}</tbody>
                </table>`,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

const registerEmail = async usuario => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.TEST_MAIL,
            pass: process.env.TEST_MAIL_PASS
        }
    })

    const mailOptions = {
        from: `Nodemailer - ${process.env.TEST_MAIL}`,
        to: process.env.TEST_MAIL,
        subject: `Nuevo usuario registrado`,
        html: `<h1>Se ha registrado un nuevo usuario - datos:
                <h3>Nombre: ${usuario.name}</h3>
                <h3>Email: ${usuario.email}</h3>
                <h3>Telefono: ${usuario.number}</h3>`,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { buyEmail, registerEmail }