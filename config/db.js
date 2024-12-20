const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("URI:", process.env.MONGO_URI);
        console.log('Conexión a la base de datos fue exitosa');
    } catch (error) {
        console.error('Error en la conexión a la base de datos', error);
        process.exit(1);
    }
};

module.exports = dbconnect;
