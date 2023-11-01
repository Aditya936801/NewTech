import { Typography, Box, Modal } from "@mui/material";
import "./viewmodal.css"
const ViewModal = (props) => {
    const {open,handleClose} = props
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="basic-modal-container">
   sdas
    </Box>
  </Modal>
  )
}

export default ViewModal