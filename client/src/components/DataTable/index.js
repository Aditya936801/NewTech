import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { setSnackbar } from "../../store/global/globalReducer";
import { adminGet } from "../../api/admin/adminUser";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TableHeader from "./miniComponent/TableHeader";
import TableDataContainer from "./miniComponent/TableDataContainer";
import { Button } from "@mui/material";
import "./dataTable.css";
import AddModal from "../../modals/AddModal";
import EditModal from "../../modals/EditModal";

const columns = [
  { id: "userName", label: "NAME", align: "left" },
  { id: "email", label: "EMAIL", align: "left" },
  {
    id: "isMaster",
    label: "AUTHORITY",
    align: "left",
    format: (value) => (value ? "Master Admin" : "Admin"),
  },
  {
    id: "createdAt",
    label: "CREATED AT",
    align: "left",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: "action",
    label: "ACTION",
    align: "center",
  },
];

export default function DataTable(props) {
  const { adminTable } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [valueToOrderBy, setvalueToOrderBy] = useState("name");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const checkRun = useRef(true);
  

  const handleSorting = (a, b, isAscending) => {
    if (isAscending) {
      return a > b ? -1 : 1;
    } else {
      return a > b ? 1 : -1;
    }
  };

  const handleOpen =
    (modalType, rowData = null) =>
    (event) => {
      setModalType(modalType);
      setOpen(true);
      if (rowData) {
        setRowData(rowData);
      }
    };

  const handleClose = () => {
    setOpen(false);
    if(rowData !== null)
    {
      setRowData(null);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setvalueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
    const newData = data?.sort((a, b) =>
      handleSorting(a[property], b[property], isAscending)
    );
    setData(newData);
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
      setData(response?.data);
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
    if (checkRun.current) {
      checkRun.current = false;
    } else {
      getAdmin();
    }
  }, []);

  return (
    <div>
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
              handleOpen={handleOpen}
              
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
      <Button
        variant="contained"
        color="success"
        className="table-button"
        onClick={handleOpen("add")}
      >
        add
      </Button>
      {modalType === "add" && (
        <AddModal open={open} handleClose={handleClose} modalType={modalType} data={data} setData={setData}  />
      )}
      {modalType === "edit" && (
        <EditModal open={open} handleClose={handleClose} modalType={modalType} rowData={rowData} data={data} setData={setData} />
      )}
    </div>
  );
}
