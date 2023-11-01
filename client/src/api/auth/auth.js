import { BASE_URL } from "../common/constant";
import axios from "axios";

const endpoints = {
  sendOtp: "/admin/sendOtp",
  login: "/admin/login",
};

export const sendOTP = async (values) => {
  const response = await axios.post(BASE_URL + endpoints.sendOtp, values);
  return response;
};

export const login = async (value, email) => {
  const response = await axios.post(BASE_URL + endpoints.login, {
    email,
    otp: value,
  });
  return response;
};
