const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    pin: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    avatar: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    usuarioPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'usermodel' // Referencia al modelo de Usuario Principal
    }
});

const usuarioRestringido = mongoose.model("UserR", userSchema);

module.exports = usuarioRestringido;
