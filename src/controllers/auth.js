const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Email/Password no valido - Email'
            })
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Email/Password no valido - Estado false'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email/Password no valido - Password'
            })
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}


module.exports = {
    login
}