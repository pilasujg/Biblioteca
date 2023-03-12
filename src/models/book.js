import { Schema , model} from "mongoose";
const booksSchema = new Schema ({

    titulo: {type: String, require:true, trim:true},
    autor: {type: String, require:true, trim:true},
    genero: {type: String, require:true, trim:true},
    opinion: {type: Number, require:true, trim:true},
    trama: {type: String, require:true, trim:true}
},
    {
        timestramps:true,
        versionKey: false
    }
);
export default model ("libro", booksSchema)