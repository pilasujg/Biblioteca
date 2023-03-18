import express from 'express';
const router = express.Router();
import { default as mongodb } from 'mongodb';
import { default as mongoose } from 'mongoose';
import { Schema } from 'mongoose';
import { getId } from '../models/common.js';
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
import { default as book } from '../models/book.js';
import bcrypt from 'bcryptjs';





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
router.get('/login', (req, res) => {
    res.render('login/signin', {
        title: 'Login',
        helpers: req.handlebars.helpers
    });
});


router.post('/users/login', async (req,res) => {
    const db = req.app.db;
   let email = req.body.email;
    let password = req.body.password;
    let error_msg = [];
    let success_msg = [];
    //comprobar que el email existe
  let user = await db.users.findOne({email: email}) 
  console.log(user)
  if(!user){

    console.log("Email bad")
    req.flash('error_msg', 'Email is not registered');
    
    res.redirect('/signup');
  }
  if(user){
    //comprobar que el password es correcto
    console.log(user.password)
    console.log(password)
  bcrypt.compare(password, user.password)
  .then(async (result) => {
        console.log(result)
    if(result === true){
        console.log("Password good")
        req.flash('success_msg', 'You are logged in');
        res.redirect('/home');
    } else {
        console.log("Password bad")
        req.flash('error_msg', 'Password is incorrect');
        res.redirect('/home');
    }
    });
    }
});
    

/*    if (error_msg.length > 0) {
        res.render('login/signin', {
            title: 'Login',
            error_msg: error_msg,
            helpers: req.handlebars.helpers
        });
    }
    if (success_msg.length > 0) {
        res.render('listado', {
            title: 'Login',
            success_msg: success_msg,
            helpers: req.handlebars.helpers
        */    
       
    
   



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