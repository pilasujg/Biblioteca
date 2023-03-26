import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';

import dotenv from 'dotenv'
dotenv.config()



router.get('/home',async (req, res) => {
    const db = req.app.db;
    let media
    
      let todos = await db.books.aggregate([
       
     
      {$project: {titulo: 1, autor: 1, genero: 1, imagen: 1, trama: 1, opinion: {$avg: '$opinion'}, fecha: 1, _id: 1}},
  
      ]).toArray()
console.log(todos)
      

    res.render('home', {

        title: 'HOME',
        libros: todos,
       
      session: req.session,
    helpers: req.handlebars.helpers,
       config: req.app.config,
    });
    
});

router.get('/books/add', (req, res) => {
  res.render('add', {
      title: 'Nuevo libro',
       session: req.session,
       helpers: req.handlebars.helpers,
       session: req.session,
  });
});


export default router;