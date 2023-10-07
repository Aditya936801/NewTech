import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  
  },
  otp:{
    type: String,
    require:true,
  },
  
});

const userOtp = mongoose.model("userOtp",OtpSchema)
export default userOtp
