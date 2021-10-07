const { Router } = require('express');
const { check } = require('express-validator');
const { validarArchivos, validarCampos } = require('../middlewares');
const { cargarArchivo, actualizarImagenCloudinary, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
], mostrarImagen);


router.post('/', validarArchivos, cargarArchivo);

router.put('/:coleccion/:id', [validarArchivos,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
], actualizarImagenCloudinary);


module.exports = router;