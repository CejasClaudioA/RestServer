const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log("bdd conectada");
        // await mongoose.connect(process.env.MONGODB_ATLAS, {
        //     // useFindAndModify: false,
        //     // useCreateIndex: true,
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true
        // });
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la bdd:', error);
    }
}

module.exports = {
    dbConnection
}