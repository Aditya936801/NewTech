import React, { useState } from "react";
import {emailValidation,nameValidation} from "../../../../utils/validator"
import CustomHelperText from "../../../../components/CustomHelperText"
import { create_admin, update_admin } from "../../../../api/admin/adminUser";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../../store/global/globalReducer";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import "../form.css";

const AdminDataForm = (props) => {
  const {  modalType, getAdmin, handleClose, rowData={} } = props;
  const dispatch = useDispatch();
  const intialValue = modalType==="add"?{
    userName:"",
    email:"",
    isMaster:false
  }:{
    userName:rowData?.userName,
    email:rowData?.email,
    isMaster:rowData?.isMaster
  }
  const [formData,setFormData] = useState(intialValue)
  const [error,setError] = useState({
    userName:{isError:false,message:""},
    email:{isError:false,message:""}
  })
 

  const AddOrUpdateAdmin = async (row) => {
    try {
      const response =
       modalType === "edit" ? await update_admin(row) : await create_admin(row);
      getAdmin();
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message:response?.data?.message,
            severity: "success",
          },
        })
      );
      handleClose();
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message:
              err?.response? err?.response?.data?.message:"Something Went Wrong",
            severity: "error",
          },
        })
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    let tempErrors= {
      userName:{isError:false,message:false},
      email:{isError:false,message:false}
    }
    const validation = nameValidation(formData.userName)
    if(!emailValidation(formData.email))
    {
      tempErrors = {...tempErrors,email:{isError:true,message:"Invalid Email"}}
    }
    if(validation.isError)
    {
      tempErrors = {...tempErrors,userName:validation}
    }
    setError(tempErrors)
    if(!tempErrors.userName.isError&&!tempErrors.email.isError)
    {
      const values = {
        userName:formData.userName,
        email:formData.email,
        isMaster:formData.isMaster
      }
  if (modalType === "add") {
    AddOrUpdateAdmin(values);
    } else {
      AddOrUpdateAdmin({ ...values, _id: rowData?._id });
    }
    }
  };

  const handleEmailChange = (e)=>{
    setFormData({...formData,email:e.target.value})
  }
  const handleUserNameChange = (e)=>{
    setFormData({...formData,userName:e.target.value})
  }
  const handleIsMasterChange = (e)=>{
    setFormData({...formData,isMaster:e.target.value})
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
    <TextField
      onChange={handleUserNameChange}
      error={error.userName.isError}
      helperText={error.userName.isError&& <CustomHelperText errorText={error.userName.message} /> }
      value={formData.userName}
      name="userName"
      required
      label="Name"
    />
    <TextField
      onChange={handleEmailChange}
      value={formData.email}
      error={error.email.isError}
      helperText={error.email.isError&& <CustomHelperText errorText={error.email.message} /> }
      name="email"
      required
      label="Email Address"
    />
    <FormControl variant="filled">
      <InputLabel id="isMaster-select-label">Is Master</InputLabel>
      <Select
        className="form-select"
        labelId="isMaster-select-label"
        name="isMaster"
        value={formData.isMaster}
        onChange={handleIsMasterChange}
      >
        <MenuItem value={false}>No</MenuItem>
        <MenuItem value={true}>Yes</MenuItem>
      </Select>
    </FormControl>

    <Button type="submit" variant="contained">
      {modalType === "edit" ? "update" : "save"}
    </Button>
  </form>
  );
};

export default AdminDataForm;
