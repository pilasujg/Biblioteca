import app from "./app.js";
import "./lib/db.js";

app.listen(app.get("port"), () => {
    console.log("en el puerto:", app.get("port"))
});

