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
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async signup(req, res) { // registrando usuario

        const { name, number, adresse, email, password, password2, role } = req.body

        try {
            if (!name || !number || !email || !adresse || !password || !password2 || !role) return res.render("error", { status: '400', error: 'Debe completar todos los campos'})
            if (password !== password2) return res.render("error", { status: '400', error: 'Las contraseñas no coinciden'})

            // Comprobando que no exista el mail
            const users = await super.getAll()
            let userFound = users.find(user => user.email == email)

            if (userFound) return res.render("error", { status: '400', error: 'Este usuario ya existe'})

            // Guardando el usuario
            const newUser = new User({ name, number, adresse, email, password, role })
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            newUser.password = hashPassword
            await super.save(newUser)

            registerEmail({ name, email, adresse, number, role })

            return res.redirect("/")

        } catch (error) {
            res.render("error", { status: '404', error: `Error al registrarse ${error}`})
        }

    }

    async signin(req, res) { // registrando usuario

        const { email, password } = req.body

        try {
            if (!email || !password) {
                return res.render("error", { status: '400', error: 'Debe completar todos los campos'})
            }

            // Comprobando que exista el mail
            const users = await super.getAll()
            let user = users.find(user => user.email == email)
            if (!user) return res.render("error", { status: '400', error: 'Email y/o contraseña incorrectos'})

            // Validando contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.render("error", { status: '400', error: 'Email y/o contraseña incorrectos'})

            // Creacion y steo de token
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME_JWT })

            res.header('auth-token', token).json({ token })

        } catch (error) {
            res.render("error", { status: '404', error: `Error al loguearse ${error}`})
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
                res.render("error", { status: '404', error: `Error al obtener el usuario por ID ${error}`})
            }
        } else {
            try {
                const users = await super.getAll()
                res.status(200).send(users)
            } catch (error) {
                res.render("error", { status: '404', error: `Error al obtener los usuarios ${error}`})
            }
        }
    }

    async returnUsers(id) {
        if (id) {
            try {
                const user = await super.getById(id)
                return user
            } catch (error) {
                res.render("error", { status: '404', error: `Error al retirnar usuario por ID ${error}`})
            }
        } else {
            try {
                const users = await super.getAll()
                return users
            } catch (error) {
                res.render("error", { status: '404', error: `Error al retornar los usuarios ${error}`})
            }
        }
    }
}

module.exports = UserService







