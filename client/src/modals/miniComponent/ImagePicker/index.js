import {Box,Button} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomHelperText from "../../../components/CustomHelperText";
import "./imagePicker.css"

const ImagePicker = (props) => {
    const {imageName,buttonTitle,handleChange,error=""} = props
    return (
    <Box display="flex" flexDirection="column" gap="3px">
    <Box display="flex" gap="10px" alignItems="flex-end">
      <Button
        component="label"
        variant="contained"
        color="secondary"
        className="student-profile-update-button"
        startIcon={<CloudUploadIcon />}
      >
        {buttonTitle}
        <input
          hidden
          onChange={handleChange}
          type="file"
          accept="image/*"
          capture="environment"
        />
      </Button>
      <Box className="student-image-name">
        {imageName}
      </Box>
    </Box>
    {error && (
      <CustomHelperText errorText={error} />
    )}
  </Box>
  )
}

export default ImagePicker