const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async (req, res) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, email } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {

            const data = {
                nombre,
                email,
                img,
                password: ':P',
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'La cuenta está borrada.',
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido',
            error
        });
    }

}

module.exports = {
    login,
    googleSignin
}