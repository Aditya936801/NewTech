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

export const updateStudent = async (req, res) => {
  const {
    _id,
    rollNumber,
    userName,
    fatherName,
    dob,
    profilePicture,
    address,
    mobileNumber,
  } = req.body;
  try {
    const preStudent = await Student.findOne(
      {
        $and: [
          {
            _id:{ $ne: _id },
          },
          {
            rollNumber,
          }
        ]
       
        
      }
    );
    if (preStudent) {
      res.status(400).json({ message: "Roll Number is already assigned to another student" });
    } else {
      const update = {
        rollNumber,
        userName,
        fatherName,
        dob,
        profilePicture,
        address,
        mobileNumber,
      }
      const updated = await Student.findOneAndUpdate({_id:_id}, update, {
        new: true,
      });
      await updated.save()

      
      res.status(200).json({...updated,message:"Student Details Updated"});
    
    }
  } catch (error) {
    res.status(400).json({ message: "Please try again later",error:error.message });
  }
};


export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong",error:error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { _id } = req.body;
  try {
      const deleted = await Student.findOneAndDelete(
        { _id:_id }
     )
      
      res.status(201).json({message:"Student Removed"});
    }
  catch (error) {
    res.status(400).json({ message: "Please try again later",error:error.message });
  }
};

