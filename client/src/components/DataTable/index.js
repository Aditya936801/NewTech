import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { setSnackbar } from "../../store/global/globalReducer";
import { adminGet } from "../../api/admin/adminUser";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TableHeader from "./miniComponent/TableHeader";
import TableDataContainer from "./miniComponent/TableDataContainer";
import "./dataTable.css";

const columns = [
  { id: "userName", label: "NAME",align:"left" },
  { id: "email", label: "EMAIL",align:"left" },
  {
    id: "isMaster",
    label: "AUTHORITY",
    align:"left",
    format: (value) => (value ? "Master Admin" : "Admin"),
  },
  {
    id:"createdAt",
    label:"CREATED AT",
    align:"left",
    format:(value) => (new Date(value).toLocaleDateString() )
  },
  {
    id:"action",
    label:"ACTION",
    align:"center"
  }
];

export default function DataTable(props) {
  const { adminTable } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [valueToOrderBy, setvalueToOrderBy] = useState("name");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleSorting = (a, b, isAscending) => {
    if (isAscending) {
      if (a > b) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setvalueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
    const newData = data?.sort((a, b) =>
      handleSorting(a[property], b[property], isAscending)
    );

    setData([...newData]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAdmin = async () => {
    try {
      const response = await adminGet();
      setData([...data, ...response?.data]);
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message:
              err?.response?.status === 404
                ? "Something Went Wrong"
                : err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <Paper className="table-wrapper">
      <TableContainer className="table-container">
        <Table stickyHeader aria-label="sticky table">
          <TableHeader
            columns={columns}
            handleRequestSort={handleRequestSort}
            orderDirection={orderDirection}
            valueToOrderBy={valueToOrderBy}
          />
          
          <TableDataContainer
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          columns={columns}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
