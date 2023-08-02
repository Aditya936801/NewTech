import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  setSnackbar } from "../../../store/global/globalReducer";
import {  setLogin } from "../../../store/auth/authReducer";
import "./login.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import { LANDING_ROUTE } from "../../../navigation/routes/landingRoutes";
import {login} from "../../../api/auth/auth"
import Form from "./Form"

const LoginPage = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [tryleft, setTryleft] = useState(3);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const validateChar = (value, index) => {
    return !isNaN(value);
  };

  const handleComplete = async (value) => {
    try {
      const response = await login(value,email)
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
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
      navigate(LANDING_ROUTE.home)
    } catch (err) {
      console.log(err)
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
          },
        })
      );
      setTryleft((pre) => pre - 1);
      setOtp("");
    }
  };

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        navigate(LANDING_ROUTE.home);
      }
    }
  }, []);


  if(!isOtpSend)
  {
    return(
      <div className="login-container">
      <Form setIsOtpSend={setIsOtpSend} setEmail={setEmail}   />
      </div>
    )
  }

  return (
    <div className="login-container">
      { tryleft > 0 ? (
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
                navigate(LANDING_ROUTE.home);
              }}
            >
              Please Try Again Later
            </Typography>
          </div>
        )
      }
    </div>
  );
};

export default LoginPage;
