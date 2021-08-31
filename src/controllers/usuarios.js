const getUsuarios = (req, res) => {
    const params = req.query;
    res.status(403).json({
        "msg": "get API - Controlador",
        params
    });
}

const putUsuarios = (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.status(500).json({
        "ok": true,
        "msg": "put API - Controlador"
    });
}

const postUsuarios = (req, res) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        "msg": "post API - Controlador",
        nombre,
        edad
    });
}

const deleteUsuarios = (req, res) => {
    res.status(200).json({
        "ok": true,
        "msg": "delete API - Controlador"
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