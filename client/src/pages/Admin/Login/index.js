import { Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setSnackbar } from "../../../state";
import axios from "axios";
import * as yup from "yup";
import "./index.css";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const baseUrl = "http://localhost:3001";
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [tryleft, setTryleft] = useState(3);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
  });
  const initialValues = {
    email: "",
  };

  const sendOtp = async (values, onSubmitProps) => {
    try {
      setEmail(values.email);
      const response = await axios.post(baseUrl + "/admin/sendOtp", values);
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data.message,
            severity: "success",
          },
        })
      );
      onSubmitProps.resetForm();
      setIsOtpSend(true);
    } catch (err) {
      setIsLoading(false);
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response.data.message,
            severity: "error",
          },
        })
      );
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);
    sendOtp(values, onSubmitProps);
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const validateChar = (value, index) => {
    return !isNaN(value);
  };

  const handleComplete = async (value) => {
    try {
      const response = await axios.post(baseUrl + "/admin/login", {
        email,
        otp: value,
      });
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data.message,
            severity: "success",
          },
        })
      );
      dispatch(
        setLogin({
          admin: response?.data.admin,
          token: response?.data.token,
        })
      );
      if (response?.data.admin?.isMaster) {
        navigate("/admin/dashboard");
      } else {
        navigate("/admin/student");
      }
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err.response.data.message,
            severity: "error",
          },
        })
      );
      setTryleft((pre) => pre - 1);
      setOtp("");
    }
  };

useEffect(()=>{
  if (window.performance) {
    if (performance.navigation.type === 1) {
      navigate("/")
    } 
  }
},[])

  return (
    <div className="login-container">
      {isOtpSend ? (
        tryleft > 0 ? (
          <div className="login-box">
            <Typography
              textAlign="center"
              sx={{ fontSize: { xs: "30px", sm: "40px" }, mb: 3 }}
              color="primary"
            >
              OTP
            </Typography>
            <MuiOtpInput
              length={6}
              value={otp}
              onChange={handleChange}
              onComplete={handleComplete}
              validateChar={validateChar}
              TextFieldsProps={{ placeholder: "-" }}
              autoFocus
            />
            <Typography variant="h8" sx={{ mt: 2 }} color="warning.main">
              TRY LEFT : {tryleft}
            </Typography>
          </div>
        ) : (
          <div className="login-box">
            <Typography
              textAlign="center"
              variant="h5"
              sx={{ color: "GrayText", cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Please Try Again Later
            </Typography>
          </div>
        )
      ) : (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className="login-box">
              <Typography
                textAlign="center"
                sx={{ fontSize: { xs: "30px", sm: "40px" }, mb: 3 }}
                color="primary"
              >
                ADMIN LOGIN
              </Typography>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                required
                label="Email Address"
              />
              <Button
                disabled={isloading}
                type="submit"
                variant="contained"
                sx={{ mt: 4 }}
              >
                login
              </Button>
            </form>
          )}
        </Formik>
      )}
      <CustomSnackbar />
    </div>
  );
};

export default LoginPage;
