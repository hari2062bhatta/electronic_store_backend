import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  contact: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["super admin","customer","Product Manager"],
    default:"customer"
  }
});


const User=mongoose.model('User',userSchema)

export default User;