import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import {  setSnackbar } from "../../../../store/global/globalReducer";
import { useDispatch } from "react-redux";
import {sendOTP} from "../../../../api/auth/auth"



const Form = ({setEmail,setIsOtpSend}) => {
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
  });
  const initialValues = {
    email: "",
  };

  const sendOtp = async (values, onSubmitProps) => {
    try {
      setEmail(values.email);
      const response = await sendOTP(values);
      console.log(response);
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
            severity: "success",
          },
        })
      );
      onSubmitProps.resetForm();
      setIsOtpSend(true);
    } catch (err) {
      console.log(err);

      setIsLoading(false);
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.data?.message,
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
  return (
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
  );
};

export default Form;
