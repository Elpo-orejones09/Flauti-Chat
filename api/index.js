const express = require('express');
const app = express();
const connection = require('./database.js');
const cors = require('cors');


// firebase
const admin = require("firebase-admin");
const serviceAccount = require("./firebase/flauti-chat-firebase-adminsdk-maaom-eafd1e5fbd.json");

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flauti-chat-default-rtdb.europe-west1.firebasedatabase.app"
});

// Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(results);
  });
});


// Endpoint para iniciar sesión
app.get('/api/usuarios/iniSesion', (req, res) => {
  const email = req.query.email; 
  connection.query('SELECT * FROM usuarios WHERE email=?', email, (err, results) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
      return;
    } else {
      res.json(results[0]);
    }
  });
});


// Crear usuario
app.post('/api/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  admin.auth().createUser(nuevoUsuario)
    .then((userRecord) => {
      // La creación de usuario fue exitosa, ahora puedes insertar los datos en la base de datos
      const usuarioBdd = {
        nombre: userRecord.displayName,
        email: userRecord.email,
        fotoPerfil: userRecord.photoURL
      };
      connection.query('INSERT INTO usuarios SET ?', usuarioBdd, (err, results) => {
        if (err) {
          console.error('Error al insertar usuario en la base de datos:', err);
          res.status(500).json({ error: 'Error al crear usuario' });
          return;
        }
        res.json({ message: 'Usuario creado exitosamente', id: results.insertId });
      });
    })
    .catch((error) => {
      // La creación de usuario falló, maneja el error adecuadamente
      if (error.code === 'auth/email-already-exists') {
        res.status(400).json({ error: 'Ya hay una cuenta con ese correo electrónico' });
      } else {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
      }
    });
});

app.get('/api/publicaciones', (req, res) => {
  connection.query('SELECT * FROM publicaciones', (err, results) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err);
      res.status(500).json({ error: 'Error al obtener publicaciones' });
      return;
    }
    res.json([results]);
  });
});

app.get('/api/publicaciones/usuario',(req,res)=> {
  const usuario =  req.body;
  connection.query('SELECT * FROM publicaciones WHERE usuario_id = ?', usuario.id_usuario,(err, results) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
      return;
    } else {
      res.json([results]);
    }
  });
});

app.post('/api/publicaciones',(req,res)=> {
  const publicacion = {
    usuario_id: req.body.usuario_id,
    contenido: req.body.contenido,
    fecha_publicacion: new Date()
  }
  connection.query('INSERT INTO publicaciones SET ?', publicacion, (err,results) => {
    if (err) {
      console.error('Error al insertar una publicacion a la base de datos', err);
      res.status(500).json({ error: 'error al insertar publicacion' });
      return;
    }
    res.json({ message: 'Publicacion Creada correctamente', id: results });
  });
  });

module.exports = app;