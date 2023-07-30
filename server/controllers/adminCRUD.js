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
      res.status(201).json(savedAdmin);
    }
  } catch (error) {
    res.status(400).json({ message: "Admin cannot be created" });
  }
};
export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();

    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong" });
  }
};
