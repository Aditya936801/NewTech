import {emailValidation} from "../../../../utils/validator"
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import {  setSnackbar } from "../../../../store/global/globalReducer";
import { useDispatch } from "react-redux";
import {sendOTP} from "../../../../api/auth/auth"
import Loader from "../../../../components/Loader"
import CustomHelperText from "../../../../components/CustomHelperText"

const Form = ({email,setEmail,setIsOtpSend}) => {
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const [isError,setIsError] = useState(false)

  const sendOtp = async () => {
    try {
      setIsLoading(true)
      const values ={
        email:email
      }
    
      const response = await sendOTP(values);
    
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
            severity: "success",
          },
        })
      );
      setIsOtpSend(true);
    } catch (err) {
      

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
    finally{
      setIsLoading(false)
    }
  };

  const handleChange=(e)=>{
    setEmail(e.target.value)
  
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(emailValidation(email))
    {
      if(isError)
      {
        setIsError(false)
      }
      setIsLoading(true);
      sendOtp();
    }
    else
    {
      setIsError(true)
      
    }
   
  };
  return (
    isloading?<Loader/>:
       <form onSubmit={handleSubmit} className="login-box">
          <Typography
            textAlign="center"
            sx={{ fontSize: { xs: "30px", sm: "40px" }, mb: 3 }}
            color="primary"
          >
            ADMIN LOGIN
          </Typography>
          <TextField
          value={email}
            name="email"
            onChange={handleChange}
            error={isError}
            helperText={isError&&<CustomHelperText errorText="Invalid Email"/>}
            required
            label="Email Address"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
          >
            login
          </Button>
        </form>
  );
};

export default Form;
