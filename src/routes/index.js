import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';

import dotenv from 'dotenv'
dotenv.config()



router.get('/home',async (req, res) => {
    const db = req.app.db;
      const todos = await db.books.find({}).toArray()

    res.render('home', {

        title: 'HOME',
        libros: todos,
       
       // session: req.session,
    //helpers: req.handlebars.helpers,
       //config: req.app.config,
    });
    console.log(todos)
});




router.get('/add', (req, res) => {
    res.render('add', {
        title: 'ADD',
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
    let doc = {
        trama: trama,
        opinion: opinion,
        titulo: titulo,
        autor: autor,
        genero: genero,
        imagen: imagen
    }

   await db.books.insertOne({
       doc
    }, function (err, doc) {
        if (err) {
            res.send("Hubo un error al guardar el libro");
        } else {
            res.redirect('/home');
        }
    });
});




export default router;