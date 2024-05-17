const express = require('express');
const app = express();
const port = 3000;

// Importar rutas desde index.js
const indexRoutes = require('./index');

// Usar rutas definidas en index.js
app.use('/', indexRoutes);

// Iniciar el servidor
app.listen(port, () => console.log(`Server running on port ${port}`));

//Inicializacion de firebase en server.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://flauti-chat.firebaseio.com/',
    storageBucket: 'flauti-chat.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };

/* 
// Ruta para obtener un usuario por su ID
app.get('/api/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    connection.query('SELECT * FROM Usuario WHERE id_usuario = ?', [usuarioId], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            res.status(500).json({ error: 'Error al obtener usuario' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    connection.query('INSERT INTO Usuario SET ?', nuevoUsuario, (err, results) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            res.status(500).json({ error: 'Error al crear usuario' });
            return;
        }
        res.json({ message: 'Usuario creado exitosamente', id: results.insertId });
    });
});

// Ruta para actualizar un usuario existente
app.put('/api/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    const datosUsuario = req.body;
    connection.query('UPDATE Usuario SET ? WHERE id_usuario = ?', [datosUsuario, usuarioId], (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({ error: 'Error al actualizar usuario' });
            return;
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
});

// Ruta para eliminar un usuario existente
app.delete('/api/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    connection.query('DELETE FROM Usuario WHERE id_usuario = ?', [usuarioId], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).json({ error: 'Error al eliminar usuario' });
            return;
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
}); */


