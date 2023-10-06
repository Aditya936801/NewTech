import "./customHelperText.css"
const CustomHelperText = ({errorText})=>{
    return(
        <div className="custom-helper-text-container">
        {errorText}
        </div>
    )
}

export default CustomHelperText