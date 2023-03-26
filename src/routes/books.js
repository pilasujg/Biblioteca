import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';


dotenv.config()



// rutas para añadir libros


router.post('/saveBook', async (req, res) => {
    const db = req.app.db;
    let opinion = [];
    let error_msg = [];
    let success_msg = [];
    let trama = req.body.trama;
    let opin = req.body.opinion;
     opinion = (parseInt(opin));
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let genero = req.body.genero;
    let imagen = req.body.imagen;
    let date = new Date();






     await db.books.insertOne({
        trama: trama,
        opinion: [opinion],
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
    let onebook = await db.books.aggregate([
        {$match:{_id: ObjectId(id)}},
        {$project: {titulo: 1, autor: 1, genero: 1, imagen: 1, trama: 1, opinion: {$avg: '$opinion'}, fecha: 1, _id: 1}},]).toArray()
       let valor = Math.trunc(onebook[0].opinion);
       console.log(valor)
      let opinion = await db.opiniones.aggregate([  
            {$match:{libro: ObjectId(id)}},
            {$project: {opiniones: 1, _id: 0}},
            {$unwind: "$opiniones"},
            {$sort: {"opiniones.fecha": -1}},
            
            {$project: {opinion: "$opiniones.opinion", valoracion: "$opiniones.valoracion", lector: "$opiniones.lector", fecha: "$opiniones.fecha", _id: 0}}
        ]).toArray()
    console.log(onebook)
   
    res.render('view', {
        title: 'VIEW',
        onebook:onebook,
        opinion: opinion,
        valor: valor,
        helpers: req.handlebars.helpers,
        session: req.session,
       
    });
    console.log(onebook)
});


// rutas para opinar libros

router.get('/books/opinion/:id', async (req, res) => {
    const db = req.app.db;
    const id = req.params.id;
    let lectorId = req.session.lectorId;
   
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
    let valor = req.body.valoracion;
    let valoracion = parseInt(valor);
    let date = new Date();
    let yaOpinion = await db.opiniones.findOne({libro: ObjectId(id), "opiniones.idLector": lectorId});
    if(yaOpinion){
        req.flash('error_msg', 'Ya has opinado sobre este libro!');
        res.redirect('/home');
       
    } else {


    await db.opiniones.findOneAndUpdate({libro: ObjectId(id)}, {$push: {opiniones: {opinion: opinion,valoracion:valoracion, idLector:lectorId, lector: lector.nombre, fecha: date}}},{ upsert: true });
    await db.books.findOneAndUpdate({_id: ObjectId(id)}, {$push: {opinion: valoracion}},{ upsert: true });

    req.flash('success_msg', 'Opinion guardada!');
    res.redirect('/home');
    }
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

// crear ruta para la API google books
router.get('/books/search', async (req, res) => {
    const db = req.app.db;
    let lectorId = req.session.lectorId;
    console.log(lectorId)
    res.render('buscador', {
        title: 'SEARCH',
        helpers: req.handlebars.helpers,
        session: req.session,
        });
})


   

router.post('/book/storage', async (req, res) => {
    const db = req.app.db;
    let lectorId = req.session.lectorId;
    console.log(lectorId)
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let genero = req.body.genero;
    let trama = req.body.trama;
    let opinion = req.body.opinion;
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
})





export default router;