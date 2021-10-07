const { Categoria, Usuario, Producto } = require('../models');
const Rol = require('../models/rol');


const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la bdd, no es valido.`);
    }
}
const emailExiste = async (email) => {
    const emailDuplicado = await Usuario.findOne({ email });
    if (emailDuplicado) {
        throw new Error(`El correo: ${email} ya se encuentra registrado.`);
    }
}
const idUsuarioExiste = async (id) => {
    const existeID = await Usuario.findById(id);
    if (!existeID) {
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeCategoriaPorID = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeProductoPorID = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = { esRolValido, emailExiste, idUsuarioExiste, existeCategoriaPorID, existeProductoPorID };