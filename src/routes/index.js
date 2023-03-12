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




export default router;