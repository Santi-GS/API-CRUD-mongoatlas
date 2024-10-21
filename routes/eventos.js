const express = require('express');
const routerEvento = express.Router();
const ModelEvento = require('../models/eventomodel');

//obtener todos los eventos
routerEvento.get('/eventos', async (req, res) => {
    try {
        const eventos = await ModelEvento.find();
        res.status(200).send(eventos);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener eventos', error})
    }
});

//obtener un evento ID

routerEvento.get('/eventos/:id', async (req, res) => {
    try {
        const evento = await ModelEvento.findById(req.params.id);
        if(!evento){
            return res.status(404).send({mensaje: 'Evento no encontrado'});
        }
        res.status(200).send(evento);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener el evento', error})
    }
});

//Crear un nuevo evento

routerEvento.post('/eventos', async (req, res) => {
    const body = req.body;
    try {
        const nuevoEvento = await ModelEvento.create(body);
        res.status(201).send(nuevoEvento);
    } catch (error) {
        res.status(400).send(error);
    }
});

//actualizar un evento

routerEvento.put('/eventos/:id/', async (req, res) => {
    try {
        const eventoActualizado = await ModelEvento.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true});
        if (!eventoActualizado) {
            return res.status(404).send({mensaje: "Evento no encontrado"});
        }
        res.status(200).send(eventoActualizado);
    } catch (error) {
        res.status(400).send({mensaje: "Error al actualizar evento", error});
    }
});

//Eliminar evento por id

routerEvento.delete('/eventos/:id', async (req, res) => {
    try {
        const eventoEliminado = await ModelEvento.findByIdAndDelete(req.params.id);
        if (!eventoEliminado) {
            return res.status(404).send({mensaje: "Evento no encontrado"});
        }
        res.status(200).send({mensaje: "Evento eliminado correctamente"});
    } catch (error) {
        res.status(500).send({mensaje: "Error al eliminar el evento"});
    }
});

module.exports = routerEvento;
