const express = require('express');
const app = express();
const port = 3000;

// Importar rutas desde index.js
const indexRoutes = require('./index');

// Usar rutas definidas en index.js
app.use('/', indexRoutes);

// Iniciar el servidor
app.listen(port, () => console.log(`Server running on port ${port}`));