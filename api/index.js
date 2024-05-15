const express = require('express');
const router = express.Router();
const connection = require('./database.js'); 

router.get('/api/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
            return;
        }
        res.json(results);
    });
});
router.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    connection.query('INSERT INTO usuario SET ?', nuevoUsuario, (err, results) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            res.status(500).json({ error: 'Error al crear usuario' });
            return;
        }
        res.json({ message: 'Usuario creado exitosamente', id: results.insertId });
    });
});

module.exports = router;
