import express from 'express';
import bodyParser from 'body-parser';
import myhandlebars  from 'express-handlebars';
let  handlebars  = myhandlebars;
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
import db from "./lib/db.js";
import index from './routes/index.js'
import books from './routes/books.js'
//import users from './routes/users.js'

import config from './config.js'






// inicializaciones

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
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




app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

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

//fallo en la ruta???
app.use((req, res, next) => {
    req.handlebars = handlebars;
    next();
});
// routes

app.use('/', index);
//app.use('/', users);

app.use('/', books);
//app.use('/', users);



// Path: scr/routes.js
app.db = db;
app.config = config;
app.handlebars = handlebars;


export default app;