import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';
import { getId } from '../models/common.js';
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
import { default as book } from '../models/book.js';
import bcrypt from 'bcrypt';

dotenv.config()

//rutas para crear usuarios y guardarlos en la base de datos
router.get('/signup', (req, res) => {


    res.render('login/signup', {
        title: 'Registro',
        helpers: req.handlebars.helpers
    });
});
// singup users

router.post('/users/signup', async (req, res) => {
    const db = req.app.db;
    let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    // coincidir password y password1
    if (password != password2) {
        res.redirect('/users/signup');
    }
    // encriptar password
    
    let cripPass = bcrypt.hashSync(password, 10);


    let date = new Date();
    await db.users.insertOne({
        nombre: nombre,
        email: email,
        password: cripPass,
        fecha: date
    });
    res.redirect('/home');
});

//login users
router.get('/users/login', (req, res) => {

    res.render('login/signin', {
        title: 'Login',
        helpers: req.handlebars.helpers
    });
});

router.post('/users/login', async (req, res) => {
    const db = req.app.db;
    let email = req.body.email;
    let password = req.body.password;
   //comparar password con database 
  let user = await db.users.findOne({email: email}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            console.log('User not found.');
        }
        if (user) {
            bcrypt.compare(password, user.password).then(function (result, err) {
                if (result == true) {
                    console.log('Password is correct.')
                    res.redirect('/home');
                } else {
                    res.render('users/login');
                }
            });
        }
    });
   
});


router.post('/saveUser', async (req, res) => {
    const db = req.app.db;
    let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;
    let date = new Date();
    await db.users.insertOne({
        nombre: nombre,
        email: email,
        password: password,
        fecha: date
    });
    res.redirect('/home');
});

export default router;