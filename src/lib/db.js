

import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config()



mongoose.set('strictQuery', false);

let dbUrl = 
    process.env.NODE_ENV === "production" ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL;
(async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
           
        })
        console.log("DB connected!");
    }

    catch (error) {
        console.log(error);
        console.error(error)
    }    
    })();
    
  
const db = mongoose.connection;
db.books = db.collection('books');
export default db;

