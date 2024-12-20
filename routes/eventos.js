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

// Obtener eventos segun el nombre de organizador
routerEvento.get('/eventos/negocio/busqueda', async (req, res) => {
    const { nombre } = req.query;  // Obtenemos el nombre del organizador desde los query params

    try {
        const query = {};
        if (nombre) {
            // Usamos una expresión regular para buscar coincidencias flexibles e insensibles a mayúsculas/minúsculas
            query['organizador.nombre'] = { $regex: nombre, $options: 'i' };
        }
        
        const eventos = await ModelEvento.find(query);  // Ejecutamos la búsqueda en la base de datos
        
        if (!eventos.length) {
            return res.status(404).send({ mensaje: 'No se encontraron eventos con el nombre del organizador proporcionado' });
        }

        res.status(200).send(eventos);  // Enviamos los eventos encontrados
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar eventos', error });
    }
});

//Obtener eventos segun el titulo del evento
routerEvento.get('/eventos/negocio/busqueda', async (req, res) => {
    const { titulo } = req.query;  // Obtenemos el título del evento desde los query params

    try {
        const query = {};
        if (titulo) {
            // Usamos una expresión regular para buscar coincidencias flexibles e insensibles a mayúsculas/minúsculas
            query['titulo'] = { $regex: titulo, $options: 'i' };
        }
        
        const eventos = await ModelEvento.find(query);  // Ejecutamos la búsqueda en la base de datos
        
        if (!eventos.length) {
            return res.status(404).send({ mensaje: 'No se encontraron eventos con el título proporcionado' });
        }

        res.status(200).send(eventos);  // Enviamos los eventos encontrados
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar eventos', error });
    }
});


module.exports = routerEvento;
