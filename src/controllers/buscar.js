const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categoria',
    'productos',
    'usuarios',
    'roles',
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    } else {
        const regex = new RegExp(termino, 'i');
        const usuarios = await Usuario.find({
            $or: [{ nombre: regex }, { email: regex }],
            $and: [{ estado: true }]
        });
        return res.json({
            results: usuarios
        });
    }
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    } else {
        const regex = new RegExp(termino, 'i');
        const categoria = await Categoria.find({ nombre: regex, estado: true });
        return res.json({
            results: categoria
        });
    }
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    } else {
        const regex = new RegExp(termino, 'i');
        const producto = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');
        return res.json({
            results: producto
        });
    }
}

const buscar = (req, res) => {
    const { collection, termino } = req.params;
    if (!coleccionesPermitidas.includes(collection)) {
        return res.status(404).json({ msg: `Las colecciones permitidas son : ${coleccionesPermitidas}` });
    }
    switch (collection) {
        case 'categoria':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        default:
            res.status(500).json({ msg: 'uff' });
    }
    // res.status(200).json({ collection, termino });
}

module.exports = {
    buscar
}