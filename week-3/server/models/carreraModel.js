const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carrera = new Schema({
  nombre_carrera: { type: String },
  codigo_carrera: { type: Number },
  descripcion_carrera: { type: String },
});

module.exports = mongoose.model('Carrera', carrera);