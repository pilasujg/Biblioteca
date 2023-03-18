import express from 'express';
import bodyParser from 'body-parser';
import myhandlebars  from 'express-handlebars';
let  handlebars  = myhandlebars;
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import flash from "connect-flash";
import session from 'express-session';
import { fileURLToPath } from 'url';
import db from "./lib/db.js";
import index from './routes/index.js'
import books from './routes/books.js'
import users from './routes/users.js'

import config from './config.js'






// inicializaciones

const app = express();
// Create an express app
const __filename = fileURLToPath(import.meta.url);
// Create a variable to store the path to the file
const __dirname = path.dirname(__filename);
// Create a variable to store the directory path


// settings


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    partialsDir: (path.join(app.get('views'), 'partials')),
}));

app.set("view engine", ".hbs");


// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));




app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


handlebars = handlebars.create({
    helpers: {
startsWithHttp: (image) => {
    if(image.startsWith('http')){
        return '';
    }
    else{
        return 'https://ik.imagekit.io/8b9i0yggb/tr:w-340,h-160/'
    }
},
 truncate: (text) => {
    
    if( text && text.length > 20){
    return `${text.substring(0, 20)}...`;}
    else {

    return text
  }
    },
}
});

// global variables
app.use((req, res, next) => {
    req.handlebars = handlebars;
    next();
});

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});




// routes

app.use('/', index);
app.use('/', users);
app.use('/', books);





app.db = db;
app.config = config;
app.handlebars = handlebars;


export default app;