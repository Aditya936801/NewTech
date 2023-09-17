import React from "react";
import { Formik } from "formik";
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
import * as yup from "yup";
import "../form.css";

const AdminDataForm = (props) => {
  const { initialValues, modalType, getAdmin, handleClose, rowData } = props;
  const dispatch = useDispatch();
  const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
  });

  const operationAdmin = async (row) => {
    try {
      const response =
       modalType === "edit" ? await update_admin(row) : await create_admin(row);
      getAdmin();
      handleClose();
    } catch (err) {
      console.log(err)
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
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (modalType === "add") {
      operationAdmin(values);
    } else {
      operationAdmin({ ...values, _id: rowData?._id });
    }
    onSubmitProps.resetForm();
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
        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.userName}
            name="userName"
            error={Boolean(touched.userName) && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
            required
            label="Name"
          />
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
          <FormControl variant="filled">
            <InputLabel id="isMaster-select-label">Is Master</InputLabel>
            <Select
              className="form-select"
              labelId="isMaster-select-label"
              name="isMaster"
              value={values.isMaster}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained">
            {modalType === "edit" ? "update" : "save"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AdminDataForm;
