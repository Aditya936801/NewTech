import React from "react";
import BasicModal from "../../components/BasicModal";
import "../modal.css";

const AddModal = (props) => {
  const { open, handleClose,  modalType, getAdmin } = props;
  const initialValues = {
    userName: "",
    email: "",
    isMaster: false,
  };
  return (
    <div>
      <BasicModal open={open} handleClose={handleClose} getAdmin={getAdmin} modalType={modalType} initialValues={initialValues} />
    </div>
  );
};

export default AddModal;
