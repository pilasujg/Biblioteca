import { Schema , model} from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema ({

name: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true}
}, {
    timestamps:true
});
userSchema.methods.encryPassword = async password => {
    const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



export default model ("User", userSchema)