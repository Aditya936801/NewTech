import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    studentId: {
      type: String,
      require: true,
    },
    certificateName:{
      type:String,
      require:true,
    },
    certificatePicture:{
      type:String,
      require:true,
    }
  },{
    timestamps:true
  });

  const Certificate = mongoose.model("Certificate",CertificateSchema)
export default Certificate