const { createTransport } = require('nodemailer')

const buyEmail = async (order, user) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.TEST_MAIL,
            pass: process.env.TEST_MAIL_PASS
        }
    })

    let body = order.reduce((acu, product) => {
        acu += `   <tr>
                        <td> ${product.name} </td>
                        <td> ${product.description} </td>
                        <td> ${product.price} </td>
                    </tr>`
        return acu
    }, '')

    const mailOptions = {
        from: `Nodemailer - ${process.env.TEST_MAIL}`,
        to: process.env.TEST_MAIL,
        subject: `Nuevo pedido de: ${user}`,
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

const registerEmail = async user => {
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
                <h3>Nombre: ${user.name}</h3>
                <h3>Email: ${user.email}</h3>
                <h3>Telefono: ${user.number}</h3>
                <h3>Rol: ${user.role}</h3>`,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { buyEmail, registerEmail }