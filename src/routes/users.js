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
import session from 'express-session';





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
    let error_msg = [];
    let success_msg = [];
    let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    // coincidir password y password1
    if (password != password2) {
        req.flash('error_msg', 'Passwords do not match');
        res.redirect('/signup');
    }else{
    //comprobar que el email existe
    let user = await db.users.findOne({email: email})
    console.log(user)
     if(user){
         req.flash('error_msg', 'Email already registered');
         res.redirect('/login');
     }
    if(!user){
        // encriptar password
        let cripPass = await bcrypt.hash(password, 8);
        let date = new Date();

        await db.users.insertOne({
            nombre: nombre,
            email: email,
            password: cripPass,
            fecha: date
        });
        req.flash('success_msg', '¡Enhorabuena, te has registrado!');
        res.redirect('/home');
        req.session.name = nombre;
        req.session.email = email;
    
        }
    
    }
});

//login users
router.get('/login', (req, res) => {
    res.render('login/signin', {
        title: 'Login',
        helpers: req.handlebars.helpers,
        session: req.session
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
        res.redirect('/login');
    }
    });
    }
       req.session.name = user.nombre;
       req.session.email = user.email;
        });   
   
//logout users
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


export default router;