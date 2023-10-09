import React, { useState } from "react";
import { emailValidation, nameValidation } from "../../../../utils/validator";
import CustomHelperText from "../../../../components/CustomHelperText";
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

const StudentDataForm = (props) => {
  const { modalType, getStudent, handleClose, rowData = {} } = props;
  const dispatch = useDispatch();
  const intialValue =
    modalType === "add"
      ? {
          rollNumber: "",
          username: "",
          fatherName: "",
          dob: null,
          profilePicture: "",
          address: "",
          mobileNumber: null,
        }
      : {
          userName: rowData?.userName,
          email: rowData?.email,
          isMaster: rowData?.isMaster,
        };
  const [formData, setFormData] = useState(intialValue);
  const [error, setError] = useState({
    userName: { isError: false, message: "" },
    email: { isError: false, message: "" },
  });

  const handleRollNumberChange = (e) => {
    setFormData({ ...formData, rollNumber: e.target.value });
  };

  const handleUserNameChange = (e) => {
    setFormData({ ...formData, userName: e.target.value });
  };
  const handleFatherNameChange = (e) => {
    setFormData({ ...formData, fatherName: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <TextField
        onChange={handleRollNumberChange}
        name="rollNumber"
        value={formData.rollNumber}
        required
        label="ROLL NUMBER"
        type="number"
        className="type-number"
      />
      <TextField
        onChange={handleUserNameChange}
        name="userName"
        required
        label="NAME"
      />
      <TextField
        onChange={handleFatherNameChange}
        name="fatherName"
        required
        label="FATHER'S NAME"
      />
  


      <Button type="submit" variant="contained">
        {modalType === "edit" ? "update" : "save"}
      </Button>
    </form>
  );
};

export default StudentDataForm;
