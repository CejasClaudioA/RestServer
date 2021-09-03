const { Schema, model } = require('mongoose');

const rolSchema = new Schema({
    rol: { type: String, required: true },

});

module.exports = model('Role', rolSchema);