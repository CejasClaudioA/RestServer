const { Router } = require('express');
const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios');
const router = Router();

router.get('/', getUsuarios);

router.put('/:id', putUsuarios);

router.post('/', postUsuarios);

router.delete('/:id', deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;