const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeCategoriaPorID, existeProductoPorID } = require('../helpers/db-validators');
const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorID),
    validarCampos,
], eliminarProducto);





module.exports = router;