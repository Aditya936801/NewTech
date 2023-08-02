import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons, columns } from "./utility";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/global/globalReducer";
import { adminCreate,adminGet } from "../../api/admin/adminUser";


const Mtable = () => {
  const defaultTheme = createTheme();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getAdmin = async() => {
    try {
      const response = await adminGet()
      setData([...data, ...response?.data]);
    } catch (err) {
     
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.status===404?"Something Went Wrong":err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    }
  };

  const createAdmin = async(newRow)=>{
    try {
      const response = await adminCreate(newRow)
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
      <Box >
        <MaterialTable
          title="Student Details"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            pageSizeOptions: [5,10, 15, 20],
            pageSize: 5,
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
