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
import config from './config.js'


import books from './routes/books.js'
//import users from './routes/users.js'




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
    }
});

//fallo en la ruta???

// routes

app.use('/', index);
//app.use('/', users);

app.use('/books', books);
//app.use('/users', users);



// Path: scr/routes.js
app.db = db;
app.config = config;
app.handlebars = handlebars;


export default app;