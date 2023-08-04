import BasicModal from "../../components/BasicModal";
import "../modal.css";

const EditModal = (props) => {
  const { open, handleClose, modalType, rowData,data,setData } = props;
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
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default EditModal;
