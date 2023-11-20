import {
  Typography,
  Box,
  Modal,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import "./certificateModal.css";
import { useState } from "react";

const CertificateModal = ({ open, handleClose, rowData }) => {
  const selectionMenu = [rowData?.currentDiploma, rowData?.currentCourse];
  const [value, setValue] = useState(selectionMenu[0]);
  const handleSelection = (e) => {
    setValue(e.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="certificate-modal-container">
        <Typography
          color="primary"
          id="modal-modal-title"
          variant="h5"
          component="h2"
        >
          Upload Certificate
        </Typography>
        <Box display="flex" flexDirection="column" gap="10px" marginTop="20px">
          <FormControl fullWidth>
            <InputLabel id="certificate-select-label">
              CERTIFICATE NAME
            </InputLabel>
            <Select
              value={value}
              onChange={handleSelection}
              label="CERTIFICATE NAME"
              labelId="certificate-select-label"
            >
              {selectionMenu?.map(
                (el) => el !== "" && <MenuItem value={el}>{el}</MenuItem>
              )}
            </Select>
          </FormControl>
 </Box>
      </Box>
    </Modal>
  );
};

export default CertificateModal;
