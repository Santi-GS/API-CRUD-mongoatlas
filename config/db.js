const mongoose = require('mongoose');
const dbconnect = async (req,res) => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dbgestoreventos");
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error de coneción ala base de datos', error);
        process.exit(1);
    }
};
module.exports = dbconnect;