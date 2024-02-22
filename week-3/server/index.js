const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/teachers", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Routes for teachers CRUD
const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = require("./controllers/teacherController.js");

// Routes for courses CRUD
const {
  coursePost,
  courseGet,
  courseDelete
} = require("./controllers/courseController.js");

app.get("/api/cursos", courseGet);
app.post("/api/cursos", coursePost);
app.delete("/api/cursos/:id", courseDelete);

// Routes for careers CRUD
const {
  getCarreras,
  crearCarrera,
  actualizarCarrera,
  eliminarCarrera
} = require("./controllers/carreraController.js");

app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers", teacherDelete);


app.get("/api/carreras", getCarreras);
app.post("/api/carreras", crearCarrera);
app.put("/api/carreras/:id", actualizarCarrera);
app.delete("/api/carreras/:id", eliminarCarrera);

app.listen(3001, () => console.log(`Server running on port 3001!`));
