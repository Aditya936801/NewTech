import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { setSnackbar } from "../../store/global/globalReducer";
import { setLogin } from "../../store/auth/authReducer";
import { get_admins } from "../../api/admin/adminUser";
import { get_students } from "../../api/admin/student";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import TableHeader from "./miniComponent/TableHeader";
import TableDataContainer from "./miniComponent/TableDataContainer";
import { Button } from "@mui/material";
import "./dataTable.css";
import { adminColumns,studentColumns } from "./utils";
import BasicModal from "./miniComponent/BasicModal";
import DeleteDialog from "../../modals/DeleteDialog";
import SearchBar from "../SearchBar";

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
  
  const keys = adminTable?["userName", "email"]:["userName","rollNumber"];
  const search = (q) => {
    if(q==="")
    {
      return data
    }
    const query = q?.toLowerCase() || q;
    const newData = data?.filter((el) =>
      keys.some((key) => el[key]?.toString()?.toLowerCase().includes(query))
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

  const getData = async () => {
    try {
      const response = adminTable? await get_admins():await get_students();
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
      getData();
  }, []);

  return (
    <div>
      <SearchBar placeholder={adminTable?"Search Admin":"Search Student"} handleSearch={handleSearch} query={query} />
      <Paper className="table-wrapper">
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHeader
              columns={adminTable?adminColumns:studentColumns}
              handleRequestSort={handleRequestSort}
              orderDirection={orderDirection}
              valueToOrderBy={valueToOrderBy}
            />

            <TableDataContainer
              data={searchData}
              page={page}
              rowsPerPage={rowsPerPage}
              columns={adminTable?adminColumns:studentColumns}
              handleOpen={handleOpen}
              searchData={searchData}
              adminTable={adminTable}
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
      {(modalType === "add" || modalType === "edit") && (
      <BasicModal adminTable={adminTable} open={open} handleClose={handleClose} getData={getData} modalType={modalType} rowData={rowData}  />
       
      )}
     
      {modalType === "delete" && (
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          rowData={rowData}
          getData={getData}
          adminTable={adminTable}

        />
      )}
    </div>
  );
}
