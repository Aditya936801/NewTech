import Admin from "../models/Admin.js";
import userOtp from "../models/userOtp.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
});

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const exist = await Admin.findOne({
      email: email,
    });

    if (exist) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const existOtp = await userOtp.findOne({
        email: email,
      });
      if (existOtp) {
        const updateData = await userOtp.findByIdAndUpdate(
          { _id: existOtp._id },
          { otp: otp },
          { new: true }
        );
        await updateData.save();
      } else {
        const savedOtp = new userOtp({
          email,
          otp,
        });
        await savedOtp.save();
      }
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "NEWTECH OTP LOGIN VALIDATION",
        text: `For admin login One Time Password is - ${otp} `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(400).json({ message: "OTP Not Send" });
        } else {
          res.status(200).json({ message: "OTP  Send" });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid Details",error:error.message });
  }
};

export const login = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });
    const verifyEmail = await userOtp.findOne({ email: email });
    if (verifyEmail) {
      if (verifyEmail.otp === otp) {
        if (admin?.isMaster) {
          const token = jwt.sign(
            { id: admin._id },
            process.env.MASTER_JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.status(200).json({ token, admin, message: "Login Successful" });
        } else {
          const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({ token, admin, message: "Login Successful" });
        }
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (err) {
    res.status(400).json({ message: "Login failed" });
  }
};
