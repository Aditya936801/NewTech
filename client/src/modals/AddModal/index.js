import React from "react";
import BasicModal from "../../components/DataTable/miniComponent/BasicModal";
import "../modal.css";

const AddModal = (props) => {
  const { open, handleClose,  modalType, getData,adminTable } = props;
  return (
    <div>
      <BasicModal adminTable={adminTable} open={open} handleClose={handleClose} getData={getData} modalType={modalType}  />
    </div>
  );
};

export default AddModal;
