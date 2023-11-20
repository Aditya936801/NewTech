import React, { useState } from "react";
import { nameValidation } from "../../../../utils/validator";
import CustomHelperText from "../../../../components/CustomHelperText";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../../store/global/globalReducer";
import {
  TextField,
  Button,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { base64 } from "../../../../utils/helperFunction";
import { create_student, update_student } from "../../../../api/admin/student";
import CustomSelector from "./subComponent/CustomSelector"
import "../form.css";

const intialDob = dayjs("01-01-2010").$d.getTime();

const StudentDataForm = (props) => {
  const { modalType, getStudent, handleClose, rowData = {} } = props;
  const dispatch = useDispatch();
  const intialValue =
    modalType === "add"
      ? {
          rollNumber: "",
          userName: "",
          fatherName: "",
          dob: intialDob,
          profilePicture: {
            name: "",
            image: "",
          },
          address: "",
          mobileNumber: "",
          diploma: "",
          course:"",
        }
      : {
          rollNumber: rowData?.rollNumber,
          userName: rowData?.userName,
          fatherName: rowData?.fatherName,
          dob: rowData?.dob,
          profilePicture: {
            name: rowData?.profilePicture?.name,
            image: rowData?.profilePicture?.image,
          },
          address: rowData?.address,
          mobileNumber: rowData?.mobileNumber,
        };
  const [formData, setFormData] = useState(intialValue);
  const [error, setError] = useState({
    userName: { isError: false, message: "" },
    fatherName: { isError: false, message: "" },
    profilePicture: { isError: false, message: "" },
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
  const handleAddressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };
  const handleMobileNumberChange = (e) => {
    const num = e.target.value.toString();
    if (num.length <= 10) {
      setFormData({ ...formData, mobileNumber: num });
    }
  };
  const handleDiplomaChange = (e) => {
    setFormData({ ...formData, diploma: e.target.value });
  };
  const handleCourseChange = (e) => {
    setFormData({ ...formData, course: e.target.value });
  };
  const handleDOBChange = (e) => {
    setFormData({ ...formData, dob: e.$d.getTime() });
  };
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const maxFileSizeInMB = 2;
    const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
    if (file.size > maxFileSizeInKB) {
      setError({
        ...error,
        profilePicture: {
          isError: true,
          message: `Size should be less than ${maxFileSizeInMB} mb`,
        },
      });
    } else {
      setError({ ...error, profilePicture: { isError: false, message: "" } });
      const image = await base64(file);
      setFormData({
        ...formData,
        profilePicture: {
          name: file.name,
          image: image,
        },
      });
    }
  };

  const formValidation = () => {
    let tempErrors = {
      userName: { isError: false, message: "" },
      fatherName: { isError: false, message: "" },
      profilePicture: { isError: false, message: "" },
    };
    const userNameValidation = nameValidation(formData.userName);
    const fatherNameValidation = nameValidation(formData.fatherName);
    if (userNameValidation.isError) {
      tempErrors = { ...tempErrors, userName: userNameValidation };
    }
    if (fatherNameValidation.isError) {
      tempErrors = { ...tempErrors, fatherName: fatherNameValidation };
    }
    if (!formData?.profilePicture?.name) {
      tempErrors = {
        ...tempErrors,
        profilePicture: {
          isError: true,
          message: "Please select a profile picture",
        },
      };
    }
    setError(tempErrors);
    if (
      !tempErrors.userName.isError &&
      !tempErrors.fatherName.isError &&
      !tempErrors.profilePicture.isError
    ) {
      return true;
    }
    return false;
  };

  const AddOrUpdateStudent = async (row) => {
    try {
      const response =
        modalType === "add"
          ? await create_student(row)
          : await update_student(row);
      getStudent();
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
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
            message: err?.response
              ? err?.response?.data?.message
              : "Something Went Wrong",
            severity: "error",
          },
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const is_form_complete = formValidation();
    if (is_form_complete) {
      const values = {
        rollNumber: formData.rollNumber,
        userName: formData.userName,
        fatherName: formData.fatherName,
        dob: formData.dob,
        profilePicture: formData.profilePicture,
        address: formData.address,
        mobileNumber: formData.mobileNumber,
        currentDiploma:formData.diploma,
        currentCourse:formData.course
      };
      if (modalType === "add") {
        AddOrUpdateStudent(values);
      } else {
        AddOrUpdateStudent({ ...values, _id: rowData?._id });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container student-form-container"
    >
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
        value={formData.userName}
        helperText={
          error.userName.isError && (
            <CustomHelperText errorText={error.userName.message} />
          )
        }
      />
      <TextField
        onChange={handleFatherNameChange}
        name="fatherName"
        required
        label="FATHER'S NAME"
        value={formData.fatherName}
        helperText={
          error.fatherName.isError && (
            <CustomHelperText errorText={error.fatherName.message} />
          )
        }
      />
      <TextField
        onChange={handleMobileNumberChange}
        name="mobileNumber"
        required
        type="number"
        label="MOBILE NUMBER"
        value={formData.mobileNumber}
        className="type-number"
      />
      <TextField
        onChange={handleAddressChange}
        value={formData.address}
        name="address"
        required
        label="ADDRESS"
        multiline
        maxRows={2}
      />
      <div className="form-selector">
      <CustomSelector value={formData.diploma} handleChange={handleDiplomaChange} courseType="DIPLOMA" />
      <CustomSelector value={formData.course} handleChange={handleCourseChange} courseType="Course" />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="DATE OF BIRTH"
            format="DD-MM-YYYY"
            onChange={handleDOBChange}
            defaultValue={dayjs(new Date(formData.dob))}
            maxDate={dayjs(new Date())}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Box display="flex" flexDirection="column" gap="3px">
        <Box display="flex" gap="10px" alignItems="flex-end">
          <Button
            component="label"
            variant="contained"
            color="secondary"
            className="student-profile-update-button"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              hidden
              onChange={handlePhotoChange}
              type="file"
              accept="image/*"
              capture="environment"
            />
          </Button>
          <Box className="student-image-name">
            {formData.profilePicture.name}
          </Box>
        </Box>
        {error.profilePicture.isError && (
          <CustomHelperText errorText={error.profilePicture.message} />
        )}
      </Box>

      <Button type="submit" variant="contained">
        {modalType === "edit" ? "update" : "save"}
      </Button>
    </form>
  );
};

export default StudentDataForm;
