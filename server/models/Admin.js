import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    require: true,
  },
  isMaster:{
    type:Boolean,
    default:false,
  }
},{
  timestamps:true
});

const Admin = mongoose.model("Admin",AdminSchema)
export default Admin
