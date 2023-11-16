import { Typography, Box, Modal } from "@mui/material";
import "./viewmodal.css";
const ViewModal = (props) => {
  const { open, handleClose, rowData } = props;
  const DOB = new Date(rowData?.dob).toLocaleDateString();
  const certified = rowData?.certified.length === 0 ? "NONE": rowData?.certified.join(" , ")
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <div className="vm-container">
        
          <Box display="flex" flexDirection="column" gap="5px">
            <div className="vm-text" ><b>Roll Number : </b> {rowData?.rollNumber}</div>
            <div className="vm-text"><b>Name : </b> {rowData?.userName}</div>
            <div className="vm-text"><b>Father's Name : </b>{rowData?.fatherName}</div>
            <div className="vm-text"><b>Mobile Number : </b>{rowData?.mobileNumber}</div>
            <div className="vm-text"><b>Date Of Birth : </b>{DOB}</div>
            <div className="vm-text"><b>Address : </b>{rowData?.address}</div>
            <div className="vm-text"><b>Current Course : </b>{rowData?.currentCourse}</div>
            <div className="vm-text"><b>Current Diploma : </b>{rowData?.currentDiploma}</div>
            <div className="vm-text"><b>Certified : </b>{certified}</div>
          </Box>
          <img
          src={rowData?.profilePicture?.image}
          alt="Loading"
          className="vm-profile-picture"
        />
        </div>
      </Box>
    </Modal>
  );
};

export default ViewModal;
