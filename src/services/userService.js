const { User } = require('../schemas/User.js')
const MongoConteiner = require('../database/mongo.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerEmail } = require('../utils/sendEmail.js')

class UserService extends MongoConteiner {

    static instance

    constructor() {
        super(User)
    }

    static getInstance() {
        if (UserService.instance) {
            return UserService.instance;
        }
        UserService.instance = new UserService();
        return UserService.instance;
    }

    async signup(req, res) { // registrando usuario

        const { name, number, email, password, password2 } = req.body

        try {
            if (!name && !number && !email && !password && !password2) return res.redirect("/error")
            if (password !== password2) return res.redirect("/error")

            // Comprobando que no exista el mail
            const users = await super.getAll()
            let userFound = users.find(user => user.email == email)

            if (userFound) return res.redirect("/error")

            // Guardando el usuario
            const newUser = new User({ name, number, email, password })
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            newUser.password = hashPassword
            await super.save(newUser)

            registerEmail({ name, email, number })

            return res.redirect("/")

        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }

    }

    async signin(req, res) { // registrando usuario

        const { email, password } = req.body

        try {
            if (!email && !password) {
                return res.redirect("/error")
            }

            // Comprobando que exista el mail
            const users = await super.getAll()
            let user = users.find(user => user.email == email)
            if (!user) return res.status(400).redirect("/error")

            // Validando contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).redirect("/error")

            // Creacion y steo de token
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, { expiresIn: '10m' })

            res.header('auth-token', token).json({ token })

        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }

    }

    // Funcion para obtener todos los usuarios
    async getUsers(req, res) {
        const { id } = req.params
        if (id) {
            try {
                const user = await super.getById(id)
                res.status(200).send(user)
            } catch (error) {
                res.status(400).json({ message: `usuario con id no encontrado ${id}` })
            }
        } else {
            try {
                const users = await super.getAll()
                res.status(200).send(users)
            } catch (error) {
                res.status(400).json({ message: `error al listar usuarios` })
            }
        }
    }
}

module.exports = UserService







