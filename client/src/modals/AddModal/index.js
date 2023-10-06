import React from "react";
import BasicModal from "../../components/DataTable/miniComponent/BasicModal";
import "../modal.css";

const AddModal = (props) => {
  const { open, handleClose,  modalType, getAdmin } = props;
  return (
    <div>
      <BasicModal open={open} handleClose={handleClose} getAdmin={getAdmin} modalType={modalType}  />
    </div>
  );
};

export default AddModal;
