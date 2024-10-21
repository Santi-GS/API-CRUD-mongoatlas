const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const eventosRoutes = require('./routes/eventos');
const eventEmisor = require('./routes/eventos');

app.use(express.json());
app.use(eventosRoutes);
app.use(eventEmisor);

dbconnect().then(() => {
    app.listen(3000, () => {
            console.log('El servidor está corriendo en el puerto 3000');
    });

}).catch(err => {
    console.log('No se pudo iniciar el servidor debido a un error en la base de datos')
});