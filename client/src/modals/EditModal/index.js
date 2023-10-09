import BasicModal from "../../components/DataTable/miniComponent/BasicModal";

import "../modal.css";

const EditModal = (props) => {
  const { open,adminTable,handleClose, modalType, rowData,getData } = props;
  return (
    <div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        getData={getData}
        rowData={rowData}
        adminTable={adminTable} 
        
      />
    </div>
  );
};

export default EditModal;
