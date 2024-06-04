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

//buscar usuarios por su nombre
app.get('/api/usuarios/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  connection.query('SELECT * FROM usuarios WHERE nombre = ?',nombre ,(err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(results);
  });
});

app.get("/api/usuarios/no/:id", (req, res) => {
  const user = req.params.id;
  connection.query('SELECT * FROM usuarios WHERE id != ?', [user], (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para iniciar sesión
app.get('/api/usuarios/iniSesion/:email', (req, res) => {
  const email = req.params.email;
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
      console.log("usuario", nuevoUsuario)
      // La creación de usuario fue exitosa, ahora puedes insertar los datos en la base de datos
      const usuarioBdd = {
        nombre: nuevoUsuario.displayName,
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

app.get('/api/publicaciones/usuario/:id', (req, res) => {
  const usuario = req.params.id;
  connection.query('SELECT * FROM publicaciones WHERE usuario_id = ?',[usuario], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
      return;
    } else {
      res.json(results);
    }
  });
});

app.get('/api/publicaciones/:id', (req, res) => {
  const publicacion = req.params.id;
  connection.query('SELECT * FROM publicaciones WHERE id = ?',[publicacion], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
      return;
    } else {
      res.json(results);
    }
  });
});

app.post('/api/publicaciones', (req, res) => {
  const publicacion = {
    usuario_id: req.body.usuario_id,
    contenido: req.body.contenido,
    fecha_publicacion: new Date()
  }
  connection.query('INSERT INTO publicaciones SET ?', publicacion, (err, results) => {
    if (err) {
      console.error('Error al insertar una publicacion a la base de datos', err);
      res.status(500).json({ error: 'error al insertar publicacion' });
      return;
    }
    res.json({ message: 'Publicacion Creada correctamente', id: results });
  });
});

//eliminar publicaiones
app.delete('/api/publicaciones/:id', (req, res) => {
  const publicacion = req.params.id;
  connection.query('DELETE FROM publicaciones WHERE id = ?', [publicacion], (err, results) => {
    if (err) {
      console.error('Error al eliminar publicacion:', err);
      res.status(500).json({ error: 'Error al eliminar publicacion' });
      return;
    }
    res.json({ message: 'Publicacion eliminadas correctamente' });
  });
});

app.get('/api/seguidores/:id', (req, res) => {
  const usuario = req.params.id;
  connection.query('SELECT * FROM seguir WHERE seguido_id = ?', usuario, (err, results) => {
    if (err) {
      console.error('Error al obtener seguidores:', err);
      res.status(500).json({ error: 'Error al obtener seguidores' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/seguidos/:id', (req, res) => {
  const usuario = req.params.id;
  connection.query('SELECT * FROM seguir WHERE seguidor_id = ?', usuario, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/seguir', (req, res) => {
  const seguir = {
    seguidor_id: req.body.seguidor_id,
    seguido_id: req.body.seguido_id,
    fecha_seguimiento: Date()
  }
  connection.query('INSERT INTO seguir SET ?', seguir, (err, results) => {
    if (err) {
      console.error('Error al insertar seguir a la base de datos', err);
      res.status(500).json({ error: 'error al insertar seguir' });
      return;
    }
    res.json({ message: 'Seguido correctamente', id: results });
  });
});

app.delete('/api/seguidos/:seguidor_id/:seguido_id', (req, res) => {
  const seguidor = req.params.seguidor_id;
  const seguido = req.params.seguido_id;
  connection.query('DELETE FROM seguir WHERE seguidor_id = ? AND seguido_id = ?', [seguidor, seguido], (err, results) => {
    if (err) {
      console.error('Error al eliminar usuarios:', err);
      res.status(500).json({ error: 'Error al eliminar usuarios' });
      return;
    }
    res.json({ message: 'Seguido eliminado correctamente' });
  });
});

//comentarios
app.get('/api/comentarios/publicacion/:id', (req, res) => {
  const publicacion = req.params.id;
  connection.query('SELECT * FROM comentarios WHERE publicacion_id = ?', publicacion, (err, results) => {
    if (err) {
      console.error('Error al obtener comentarios:', err);
      res.status(500).json({ error: 'Error al obtener comentarios' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/comentarios', (req, res) => {
  const comentario = {
    usuario_id: req.body.usuario_id,
    publicacion_id: req.body.publicacion_id,
    contenido:req.body.contenido,
    fecha_comentario: Date()
  }
  connection.query('INSERT INTO comentarios SET ?', comentario, (err, results) => {
    if (err) {
      console.error('Error al insertar comentario a la base de datos', err);
      res.status(500).json({ error: 'error al insertar comentario' });
      return;
    }
    res.json({ message: 'comentado correctamente', id: results });
  });
});


//likes

app.get('/api/likes/publicacion/:id', (req, res) => {
  const publicacion = req.params.id;
  connection.query('SELECT * FROM likes WHERE publicacion_id = ?', publicacion, (err, results) => {
    if (err) {
      console.error('Error al obtener likes:', err);
      res.status(500).json({ error: 'Error al obtener likes' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/likes/usuario/:id', (req, res) => {
  const usuario = req.params.id;
  connection.query('SELECT * FROM likes WHERE usuario_id = ?', usuario, (err, results) => {
    if (err) {
      console.error('Error al obtener likes:', err);
      res.status(500).json({ error: 'Error al obtener likes' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/likes', (req, res) => {
  const like = {
    usuario_id: req.body.usuario_id,
    publicacion_id: req.body.publicacion_id,
    fecha_like: Date()
  }
  connection.query('INSERT INTO likes SET ?', like, (err, results) => {
    if (err) {
      console.error('Error al insertar like a la base de datos', err);
      res.status(500).json({ error: 'error al insertar like' });
      return;
    }
    res.json({ message: 'Like dado correctamente', id: results });
  });
});


app.delete('/api/likes/:usuario_id/:publicacion_id', (req, res) => {
  const usuario_id = req.params.usuario_id;
  const publicacion_id = req.params.publicacion_id;
  connection.query('DELETE FROM likes WHERE usuario_id = ? AND publicacion_id = ?', [usuario_id, publicacion_id], (err, results) => {
    if (err) {
      console.error('Error al eliminar likes:', err);
      res.status(500).json({ error: 'Error al eliminar likes' });
      return;
    }
    res.json({ message: 'Like eliminado correctamente' });
  });
});

module.exports = app;