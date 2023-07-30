import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons, columns } from "./utility";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../state";


const Mtable = () => {
  const defaultTheme = createTheme();
  const [data, setData] = useState([]);
  const baseUrl = "http://localhost:3001";
  const dispatch = useDispatch();

  const getAdmin = async () => {
    try {
      const response = await axios.get(baseUrl + "/admin/getAdmin");

      setData([...data, ...response?.data]);
    } catch (err) {
     

      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err.response.status===404?"Something Went Wrong":err.response.data.message,
            severity: "error",
          },
        })
      );
    }
  };

  const createAdmin = async(newRow)=>{
    try {
      const response = await axios.post(baseUrl + "/admin/createAdmin",
        newRow
      );
    } catch (err) {
      console.log(err);

      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err.response.status===404?"Something Went Wrong":err.response.data.message,
            severity: "error",
          },
        })
      );
    }

  }
  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box p="15px">
        <MaterialTable
          title="Student Details"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            pageSizeOptions: [10, 15, 20],
            pageSize: 10,
            exportButton: true,
            exportAllData: true,
            actionsColumnIndex:-1
          }}
          editable={{
            onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
              try{
                createAdmin(newRow)
                setData([...data,newRow])
                resolve()
              }
              catch(err)
              {
                reject()
              }

            })
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Mtable;
