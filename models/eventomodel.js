const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    
    titulo: {
        type: String,
        required: [true, 'el título es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'la descripción es obligatoria'],
    },
    ubicacion: {
        type: String,
        required: [true, 'la ubicación es obligatoria'],
    },
    fecha: {
        type: String,
        required: [true, 'la fecha es obligatoria'],
    },
    hora: {
        type: String,
        required: [true, 'la hora es obligatoria'],
    },
    organizador: {
        nombre: {
            type: String,
            required: [true, 'el nombre es obligatorio'],
        },
        correo: {
            type: String,
            required: [true, 'el correo electrónico es obligatorio'],
        },
        telefono: {
            type: String,
            required: [true, 'el número de teléfono es obligatorio'],
        },
    },
    tipo: {
        type: String,
        required: [true, 'el tipo de evento es obligatorio'],
    }
}, {
    timestamps: true,
});

const ModelEvento = mongoose.model("Evento", eventoSchema);
module.exports = ModelEvento;