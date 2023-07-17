import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 550,
  width:"80%",
  bgcolor: "background.paper",
  border: "2px solid black",
  borderRadius:"4px",
  boxShadow: 24,
  p: 2,
};

const BasicModal = ({ open, setOpen, detail }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography sx={{ mb: 4 }} variant="h5">{detail?.name}</Typography>
        {detail?.learn.map((el,index) => {
          return <Typography key={index} sx={{ mt: 1 }}>{index+1}. {el}</Typography>;
        })}
      </Box>
    </Modal>
  );
};

export default BasicModal;
