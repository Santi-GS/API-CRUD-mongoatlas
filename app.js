console.log('Aplicación iniciando...');

// Cargar variables de entorno
require('dotenv').config();
const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const eventosRoutes = require('./routes/eventos');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api',eventosRoutes);


app.get('/api/test', (req, res) => {
    res.send('La aplicación está funcionando correctamente');
});
dbconnect().then(() => {
    console.log('El servidor está corriendo en el puerto');

}).catch(err => {
    console.log('No se pudo iniciar el servidor debido a un error en la base de datos')
});

module.exports = app;