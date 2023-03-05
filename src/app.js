import express from 'express';
import bodyParser from 'body-parser';
import myhandlebars  from 'express-handlebars';
let  handlebars  = myhandlebars;
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
import "./database.js";
import index from './routes/index.js'
//import books from './routes/books.js'
//import users from './routes/users.js'


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    partialsDir: [path.join(app.get('views'), 'partials')]
}));

app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

//fallo en la ruta???
//app.use('/', books);
app.use('/', index);
//app.use('/', users);


// Path: scr/routes.js


export default app;