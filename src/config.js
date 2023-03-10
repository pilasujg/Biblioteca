import {config} from "dotenv";
config();

const configuration = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/biblioteca",
    MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL || "mongodb://localhost:27017/biblioteca",
    
    NODE_ENV: process.env.NODE_ENV || "development",

};

export default configuration;