import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { delete_admin } from '../../api/admin/adminUser';
import { setSnackbar } from '../../store/global/globalReducer';
import { useDispatch } from 'react-redux';

const DeleteDialog=(props)=> {
  const { open, handleClose,  rowData,getAdmin } = props;
  const dispatch=useDispatch()
  const handleDelete = async()=>{
    try {
      const response = await delete_admin(rowData)
     getAdmin()
      handleClose()
      
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err.response.status===404?"Something Went Wrong":err.response.data.message,
            severity: "error",
          },
        })
      );
    }

  }  

  return (
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Delete This Admin
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button  onClick={handleDelete}>OK</Button>
        <Button onClick={handleClose} color='error' variant='contained' autoFocus>
          CANCEL
        </Button>
        </DialogActions>
      </Dialog>

  );
}

export default DeleteDialog