import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import exphbs from "express-handlebars";
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs.engine({
    layoutsDir:path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    defaultLayout: "main"
}));

app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

//fallo en la ruta???
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });
// Path: scr/routes.js


