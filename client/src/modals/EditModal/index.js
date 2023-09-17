import BasicModal from "../../components/BasicModal";
import "../modal.css";

const EditModal = (props) => {
  const { open, handleClose, modalType, rowData,getAdmin } = props;
  const initialValues = {
    userName: rowData?.userName,
    email: rowData?.email,
    isMaster: rowData?.isMaster,
  };
  return (
    <div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        initialValues={initialValues}
        getAdmin={getAdmin}
        rowData={rowData}
        
      />
    </div>
  );
};

export default EditModal;
