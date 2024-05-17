const express = require('express');
const app = express();
const connection = require('./database.js');

//firebase
const admin = require("firebase-admin");
const serviceAccount = require("./firebase/flauti-chat-firebase-adminsdk-maaom-eafd1e5fbd.json");

// Middleware
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
app.post('/api/usuarios/iniSesion', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Intentar autenticar el usuario con Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(email);
        // Aquí deberiamos verificar la contraseña con un sistema adecuado
        // Firebase Admin SDK no nos proporciona una forma directa de verificar la contraseña

        const token = await admin.auth().createCustomToken(userRecord.uid);
        res.status(200).send({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
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
                console.log(userRecord);
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

module.exports = app;
