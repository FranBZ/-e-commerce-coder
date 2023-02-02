/* ++++++++++++++++++
+  Avisos por mail  +
++++++++++++++++++++*/

const { createTransport } = require('nodemailer')

const buyEmail = async (order) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.TEST_MAIL,
            pass: process.env.TEST_MAIL_PASS
        }
    })
    const items = order.items  // Obtenemos los items

    let productAmount = 0
    let total = 0

    // Creamos el cuerpo de filas de los productos para insertar en la tabla
    let body = items.reduce((acu, product) => { 
        productAmount += product.amount
        total += product.amount * product.product.price
        acu += `   <tr>
                        <td> ${product.amount} </td>
                        <td> ${product.product.name} </td>
                        <td> ${product.product.description} </td>
                        <td> $${product.product.price} </td>
                        <td> $${product.amount * product.product.price} </td>
                    </tr>`
        return acu
    }, '')

    // Creamos las opciones de mail e insertamos el cuerpo de filas en la tabla
    const mailOptions = {
        from: `Nodemailer - ${process.env.TEST_MAIL}`,
        to: process.env.TEST_MAIL,
        subject: `Nuevo pedido de: ${order.email}`,
        html: ` <h2>Pedido de ${order.email}</h2>
                <h4>N° de orden: ${order.orderNumber}</h4>
                <h4>Dirección: ${order.adresse}</h4>
                <h5>Cantidad de articulos: ${productAmount}</h5>
                <h5>Monto total del pedido: $${total}</h5>
                <table>
                    <thead>
                        <th>Cantidad</th>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Parcial</th>
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

    // Creamos las opciones de mail con los datos del usuario
    const mailOptions = {
        from: `Nodemailer - ${process.env.TEST_MAIL}`,
        to: process.env.TEST_MAIL,
        subject: `Nuevo usuario registrado`,
        html: `<h1>Se ha registrado un nuevo usuario - datos:
                <h3>Nombre: ${user.name}</h3>
                <h3>Email: ${user.email}</h3>
                <h3>Telefono: ${user.number}</h3>
                <h3>Dirección: ${user.adresse}</h3>
                <h3>Rol: ${user.role}</h3>`,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { buyEmail, registerEmail }