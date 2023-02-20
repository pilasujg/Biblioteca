import { Schema , model} from "mongoose";
//import bcrypt from "bcryptjs";
const userSchema = new Schema ({

name: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true}
}, {
    timestamps:true
});

export default model ("User", userSchema)