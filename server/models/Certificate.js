import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    studentId: {
      type: String,
      require: true,
    },
    certificateNumber: {
      type: Number,
      require: true,
    },
    profilePicture:{
      type:String,
      require:true,
    }
  },{
    timestamps:true
  });

  const Certificate = mongoose.model("Certificate",CertificateSchema)
export default Certificate