const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        this.usuariosPath = '/api/usuarios';

        this.middlewares();
        this.routes();

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('src/public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {


        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}

module.exports = Server;