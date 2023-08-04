import React from "react";
import BasicModal from "../../components/BasicModal";
import "../modal.css";

const AddModal = (props) => {
  const { open, handleClose, setData, modalType, data } = props;
  const initialValues = {
    userName: "",
    email: "",
    isMaster: false,
  };
  return (
    <div>
      <BasicModal open={open} handleClose={handleClose} data={data} setData={setData} modalType={modalType} initialValues={initialValues} />
    </div>
  );
};

export default AddModal;
