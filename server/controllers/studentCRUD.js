import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const {
    rollNumber,
    userName,
    fatherName,
    dob,
    profilePicture,
    address,
    mobileNumber,
  } = req.body;
  try {
    const preStudent = await Student.findOne({
      rollNumber,
    });
 
    if (preStudent) {
      res.status(400).json({ message: "Student Already exist " });
    } else {
      const studentRegister = new Student({
        rollNumber,
        userName,
        fatherName,
        dob,
        profilePicture,
        address,
        mobileNumber,
      });
      const savedStudent = await studentRegister.save();
      res.status(201).json({...savedStudent,message:"Student Registered" });
    }
  } catch (error) {
    res.status(400).json({ message: "Please try again after Sometime",error:error.message });
  }
};


