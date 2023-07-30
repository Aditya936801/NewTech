import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
  isMaster:{
    type:Boolean,
    default:false,
  }
});

const Admin = mongoose.model("Admin",AdminSchema)
export default Admin
