import Admin from "../models/Admin.js";

export const createAdmin = async (req, res) => {
  const { userName, email, isMaster } = req.body;
  try {
    const preAdmin = await Admin.findOne({
      email: email,
    });
    if (preAdmin) {
      res.status(400).json({ message: "Admin Already exist " });
    } else {
      const adminRegister = new Admin({
        userName,
        email,
        isMaster,
      });

      const savedAdmin = await adminRegister.save();
      res.status(201).json({...savedAdmin,message:"Admin Created"})
    }
  } catch (error) {
    res.status(400).json({ message: "Admin cannot be created" });
  }
};

export const updateAdmin = async (req, res) => {
  const { _id,userName, email, isMaster } = req.body;
  try {
    const preAdmin = await Admin.findOne(
      {
        $and: [
          {
            _id:{ $ne: _id },
          },
          {
            email: email,
          }
        ]
       
        
      }
    );
    if (preAdmin) {
      res.status(400).json({ message: "Email Exist" });
    } else {
      const update = {
        userName,
        email,
        isMaster
      }
      const updated = await Admin.findOneAndUpdate({_id:_id}, update, {
        new: true,
      });
      await updated.save()

      
      res.status(200).json({...updated,message:"Admin Updated"});
    
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find().sort({ createdAt: -1 });

    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong" });
  }
};

export const deleteAdmin = async (req, res) => {
  const { _id } = req.body;
  try {
      const deleted = await Admin.findOneAndDelete(
        { _id:_id }
     )
      
      res.status(201).json(deleted);
    }
  catch (error) {
    res.status(400).json({ message: "Cannot be Deleted" });
  }
};

