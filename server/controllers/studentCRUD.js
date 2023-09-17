import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const { rollNumer,userName,fatherName,dob,profilePicture,address,mobileNumber } = req.body;  
  try{
    res.status(200).json(req.body);

  }
  catch (error) {
    res.status(400).json({ message: "Student cannot be created" });
  }
};