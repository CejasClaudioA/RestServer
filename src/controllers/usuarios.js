const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const getUsuarios = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.status(403).json({
        total, usuarios
    });
}

const postUsuarios = async (req, res) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, resto);
    res.status(500).json({
        user
    });
}

const deleteUsuarios = async (req, res) => {
    const { id } = req.params;
    const query = { estado: false };
    const usuario = await Usuario.findByIdAndUpdate(id, query);
    res.status(200).json({
        usuario
    });
}

const patchUsuarios = (req, res) => {
    res.status(200).json({
        "ok": true,
        "msg": "patch API - Controlador"
    });
}

module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios
}