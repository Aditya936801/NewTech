import BasicModal from "../../components/DataTable/miniComponent/BasicModal";

import "../modal.css";

const EditModal = (props) => {
  const { open, handleClose, modalType, rowData,getAdmin } = props;
  return (
    <div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        getAdmin={getAdmin}
        rowData={rowData}
        
      />
    </div>
  );
};

export default EditModal;
