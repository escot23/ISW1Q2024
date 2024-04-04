const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Database connection
mongoose.connect("mongodb://localhost:27017/proyecto", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión a MongoDB establecida');
  app.listen(3001, () => {
    console.log(`Server running on port 3001!`);
  });
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
const { registerPost } = require("./controllers/UserController.js");
app.post("/api/register", registerPost);
