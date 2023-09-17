import { Typography, Box, Modal } from "@mui/material";
import "./basicModal.css";
import AdminDataForm from "../../modals/miniComponent/Form/AdminDataForm";

const BasicModal = (props) => {
    const { open, handleClose, getAdmin, modalType, initialValues,rowData } = props;
  
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
            {modalType==="add"?"ADD ADMIN":"EDIT ADMIN"}
          </Typography>
          <AdminDataForm
            handleClose={handleClose}
            modalType={modalType}
           getAdmin={getAdmin}
            initialValues={initialValues}
            rowData={rowData}
            
          />
        </Box>
      </Modal>
    
  );
}

export default BasicModal