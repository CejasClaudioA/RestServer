const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validators');
const router = Router();

//obtener todas las categorias
router.get('/', obtenerCategorias);

//obtener una categoria
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], obtenerCategoria);

//crear nueva categoria, privado con cualquier rol
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//actualizar categoria por id, privado con cualquier rol
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], actualizarCategoria);

//borrar categoria, solo si es admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id',).custom(existeCategoriaPorID),
    validarCampos,
], eliminarCategoria);





module.exports = router;