import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { setSnackbar } from "../../store/global/globalReducer";
import { setLogin } from "../../store/auth/authReducer";
import { get_admin } from "../../api/admin/adminUser";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import TableHeader from "./miniComponent/TableHeader";
import TableDataContainer from "./miniComponent/TableDataContainer";
import { Button } from "@mui/material";
import "./dataTable.css";
import AddModal from "../../modals/AddModal";
import EditModal from "../../modals/EditModal";
import DeleteDialog from "../../modals/DeleteDialog";
import SearchBar from "../SearchBar";

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
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  
  const keys = ["userName", "email"];
  const search = (q) => {
    if(q==="")
    {
      return data
    }
    const query = q?.toLowerCase();
    const newData = data?.filter((el) =>
      keys.some((key) => el[key]?.toLowerCase().includes(query))
    );
    return newData;
  };
  const searchData = useMemo(() => search(query), [query,data]);
  const handleSearch = (e) => {
    setQuery(e.target.value);
   
  };

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
    if (rowData !== null) {
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
      const response = await get_admin();
      setData(response?.data);
    } catch (err) {
      dispatch(
        setLogin({
          admin: "",
          token: "",
        })
      );
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
    <div>
      <SearchBar handleSearch={handleSearch} query={query} />
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
              data={searchData}
              page={page}
              rowsPerPage={rowsPerPage}
              columns={columns}
              handleOpen={handleOpen}
              searchData={searchData}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={searchData.length}
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
        <AddModal
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          getAdmin={getAdmin}
        />
      )}
      {modalType === "edit" && (
        <EditModal
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          rowData={rowData}
          getAdmin={getAdmin}
        />
      )}
      {modalType === "delete" && (
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          rowData={rowData}
          getAdmin={getAdmin}
        />
      )}
    </div>
  );
}
