import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    require: true,
  },
  userName: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
  fatherName: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
  dob:{
    type: String,
    require: true,
  },
  address:{
    type: String,
    require: true,
  },
  mobileNumber:{
    type:Number,
    require:true,
    min:1000000000,
    max:9999999999,
  },
  profilePicture:{
    type:String,
    require:true,
  }
},{
  timestamps:true
});

const Student = mongoose.model("Student",StudentSchema)
export default Student
