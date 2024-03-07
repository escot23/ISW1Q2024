
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const { createUser, getUser } = require("./controllers/usercontroller");
const { loginUser } = require("./controllers/logincontroller");
const { createVideo, getVideos, updateVideo, deleteVideo } = require("./controllers/videocontroller");
const { crearUser, obtenerUser } = require('./controllers/usuariorestringidocontroller'); 

const app = express();
const PORT = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
    console.log("Conexión exitosa a la base de datos");
}).catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.post("/register", createUser); // Ruta para registrar usuarios
app.get("/register", getUser); // Ruta para obtener usuarios
app.post("/login", loginUser); // Ruta para iniciar sesión
app.post("/videos", createVideo); // Ruta para crear un nuevo video
app.get("/videos", getVideos); // Ruta para obtener la lista de videos
app.put("/videos/:id", updateVideo); // Actualizar un video
app.delete("/videos/:id", deleteVideo); // Borrar un video
app.post("/usuariosrestringido", crearUser);//crear usuario restringido
app.get("/usuariosrestringido", obtenerUser); //obtener usuario restringido

app.get('/api/avatares', (req, res) => {
    const rutaAvatares = path.join(__dirname, 'avatares'); // Ruta a la carpeta de avatares
    fs.readdir(rutaAvatares, (err, archivos) => {
        if (err) {
            console.error('Error al leer la carpeta de avatares:', err);
            return res.status(500).json({ error: 'Error al leer la carpeta de avatares' });
        }
        res.json(archivos);
    });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
