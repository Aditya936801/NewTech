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
    type: Number,
    require: true,
  },
  address:{
    type: String,
    require: true,
  },
  mobileNumber:{
    type:String,
    require:true,
  },
  profilePicture:{
    name:{
      type:String
    },
    image:{
      type:String
    }
  },
  currentDiploma:{
    type:String,
    
  },
  currentCourse:{
    type:String,
    
  },
  certified:[
    {
      type:String,
    }
  ]
  
},{
  timestamps:true
});

const Student = mongoose.model("Student",StudentSchema)
export default Student
