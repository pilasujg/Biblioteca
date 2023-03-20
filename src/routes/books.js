import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';

import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';


dotenv.config()



// rutas para añadir libros


router.post('/saveBook', async (req, res) => {
    const db = req.app.db;
    let error_msg = [];
    let success_msg = [];
    let trama = req.body.trama;
    let opinion = req.body.opinion;
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let genero = req.body.genero;
    let imagen = req.body.imagen;
    let date = new Date();
     await db.books.insertOne({
        trama: trama,
        opinion: opinion,
        titulo: titulo,
        autor: autor,
        genero: genero,
        imagen: imagen,
        fecha: date
    });
    

    req.flash('success_msg', 'Libro guardado!');
    res.redirect('/home');
 
   
});

// rutas para editar libros
router.get('/books/edit/:id', async (req, res) => {
    const db = req.app.db;  
    const id = req.params.id;
    let onebook = await db.books.findOne({_id: ObjectId(id)});
    
   
    res.render('edit', {
        title: 'EDIT',
        onebook:onebook,
        helpers: req.handlebars.helpers,
        session: req.session,
    });
    console.log(onebook)
});

// un libro
router.get('/books/view/:id', async (req, res) => {
    const db = req.app.db;  
    const id = req.params.id;
    let onebook = await db.books.findOne({_id: ObjectId(id)});
    
   
    res.render('view', {
        title: 'VIEW',
        onebook:onebook,
        helpers: req.handlebars.helpers,
        session: req.session,
       
    });
    console.log(onebook)
});


// rutas para opinion libros

router.get('/books/opinion/:id', async (req, res) => {
    const db = req.app.db;
    const id = req.params.id;
    console.log(id)
    res.render('lectores/opinion', {
        title: 'OPINION',
        id: id,
        helpers: req.handlebars.helpers,
        session: req.session,
        });
});


router.post('/books/opinion', async (req, res) => {
    const db = req.app.db;
    const id = req.body.id;
    const lectorId = req.session.lectorId;
    
    let lector = await db.users.findOne({_id: ObjectId(lectorId)});
    console.log(lector)
    console.log(id)
    let opinion = req.body.opinion;
    let date = new Date();
    await db.opiniones.findOneAndUpdate({libro: ObjectId(id)}, {$push: {opiniones: {opinion: opinion, idLector:lectorId, lector: lector.nombre, fecha: date}}},{ upsert: true });
    req.flash('success_msg', 'Opinion guardada!');
    res.redirect('/home');
});



// listar libros
router.get('/books/listado', async (req, res) => {
    const db = req.app.db;
    let lectorId = req.session.lectorId;
    console.log(lectorId)
    let books = await db.books.find({}).sort({titulo:1}).toArray();
    
    console.log('hola');
    
    
      
    res.render('listado', {
        title: 'BOOKS',
        books: books,
        helpers: req.handlebars.helpers,
        session: req.session,
    });
});



export default router;