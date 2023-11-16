import { Typography, Box, Modal } from "@mui/material";
import "./basicModal.css";
import AdminDataForm from "../miniComponent/Form/AdminDataForm";
import StudentDataForm from "../miniComponent/Form/StudentDataForm";
const BasicModal = (props) => {
    const { open,adminTable, handleClose, getData, modalType,rowData } = props;
  
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="basic-modal-container">
          <Typography
            color="primary"
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            {adminTable?modalType==="add"?"ADD ADMIN":"EDIT ADMIN":modalType==="add"?"REGISTER STUDENT":"EDIT STUDENT"}
          </Typography>
          {
            adminTable?
            <AdminDataForm
            handleClose={handleClose}
            modalType={modalType}
           getAdmin={getData}
           rowData={rowData}
           
           />:
           <StudentDataForm
           handleClose={handleClose}
           modalType={modalType}
          getStudent={getData}
          rowData={rowData}
           />
          }
        </Box>
      </Modal>
    
  );
}

export default BasicModal