const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; //Tendremos que poner el puerto de Xampp entiendo pero dejo el 3000 como boceto

//Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'tu_host_de_mysql',
    user: 'tu_usuario_de_mysql',
    password: 'tu_contraseña_de_mysql',
    database: 'tu_base_de_datos'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con la base de datos MySQL');
});

// Middleware para manejar el cuerpo de la solicitud JSON cuando usemos postman
app.use(express.json());




// Rutas de la API

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    connection.query('SELECT * FROM Usuario', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
            return;
        }
        res.json(results);
    });
});

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
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
