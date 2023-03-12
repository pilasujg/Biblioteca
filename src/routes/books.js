import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';
import { getId } from '../models/common.js';
import dotenv from 'dotenv'
dotenv.config()



// rutas para añadir libros
router.get('/books/add', (req, res) => {
    res.render('add', {
        title: 'Nuevo libro',
         // session: req.session,

    });
});

router.post('/saveBook', async (req, res) => {
    const db = req.app.db;
    let trama = req.body.trama;
    let opinion = req.body.opinion;
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let genero = req.body.genero;
    let imagen = req.body.imagen;
    const libro = new libro({titulo, autor, genero, opinion, trama, imagen});
    await libro.save();
    res.redirect('/home');
   
   
});

// rutas para editar libros
router.get('/edit/:id', async (req, res) => {
    const db = req.app.db;  
    const id = req.params.id;
    console.log(id)
    console.log('hola')
    const book = await db.books.findOne({ _id: getId(id) });
    res.render('edit', {
        title: 'EDIT',
        book: book,
        // session: req.session,
    });
});



export default router;