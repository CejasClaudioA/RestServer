const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, idUsuarioExiste } = require('../helpers/db-validators');

const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'No es un correo valido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'El password debe ser de al menos 4 caracteres').isLength({ min: 4 }),
    check('rol').custom(esRolValido),
    validarCampos
], postUsuarios);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('rol').custom(esRolValido),
    validarCampos
], putUsuarios);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    validarCampos
], deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;