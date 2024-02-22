const Carrera = require("../models/carreraModel");

// Obtener todas las carreras
const getCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.status(200).json(carreras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las carreras" });
  }
};

// Crear una nueva carrera
const crearCarrera = async (req, res) => {
  const { nombre_carrera, codigo_carrera, descripcion_carrera } = req.body;
  try {
    const nuevaCarrera = new Carrera({ nombre_carrera, codigo_carrera, descripcion_carrera });
    await nuevaCarrera.save();
    res.status(201).json(nuevaCarrera);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la carrera" });
  }
};

// Actualizar una carrera existente
const actualizarCarrera = async (req, res) => {
  const { id } = req.params;
  const { nombre_carrera, codigo_carrera, descripcion_carrera } = req.body;
  try {
    const carreraActualizada = await Carrera.findByIdAndUpdate(
      id,
      { nombre_carrera, codigo_carrera, descripcion_carrera },
      { new: true }
    );
    res.status(200).json(carreraActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la carrera" });
  }
};

// Eliminar una carrera existente
const eliminarCarrera = async (req, res) => {
  const { id } = req.params;
  try {
    await Carrera.findByIdAndDelete(id);
    res.status(204).json({ message: "Carrera eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la carrera" });
  }
};

module.exports = {
  getCarreras,
  crearCarrera,
  actualizarCarrera,
  eliminarCarrera
};
