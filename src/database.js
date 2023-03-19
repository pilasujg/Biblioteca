import mongoose from "mongoose";
import config from "./config.js";

(async () => {
    try {
        const db = await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected!");
    } catch (error) {
        console.error(error);
    }
}
)();

dbUrl = getDbUri(dbUrl);


