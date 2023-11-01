import "./customHelperText.css"
const CustomHelperText = ({errorText})=>{
    return(
        <span className="custom-helper-text-container">
        {errorText}
        </span>
    )
}

export default CustomHelperText