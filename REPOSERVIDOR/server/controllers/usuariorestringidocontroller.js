const usuarioRestringido = require('../models/usuariosrestringidosmodel');
const UsuarioPrincipal = require('../models/usermodel'); // Importar el modelo de Usuario Principal

const fs = require('fs');
const path = require('path');


const obtenerNombresDeArchivosDeAvatares = async () => {
    const rutaAvatares = path.join(__dirname, 'avatares');
    try {
        const nombresDeArchivos = await fs.promises.readdir(rutaAvatares);
        return nombresDeArchivos;
    } catch (error) {
        throw error;
    }
};


const crearUser = async (req, res) => {
    const { nombre, pin, avatar, edad, usuarioPrincipalId } = req.body;
    if (!nombre || !pin || !avatar || !edad || !usuarioPrincipalId) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar si el usuario principal existe
    const usuarioPrincipal = await UsuarioPrincipal.findById(usuarioPrincipalId);
    if (!usuarioPrincipal) {
        return res.status(404).json({ error: "El usuario principal no existe" });
    }

    // Crear instancia del usuario restringido con los datos recibidos
    let user = new usuarioRestringido({
        nombre,
        pin,
        avatar,
        edad,
        usuarioPrincipal: usuarioPrincipalId // Asignar la ID del usuario principal
    });

    // Guardar el usuario restringido en la base de datos
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error al guardar el usuario restringido:', error);
        res.status(500).json({ error: 'Hubo un error al intentar registrar el usuario restringido' });
    }
};

const obtenerUser = (req, res) => {
    usuarioRestringido.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
        });
};

    
    module.exports = {
        crearUser,
        obtenerUser,
        obtenerNombresDeArchivosDeAvatares
    };
