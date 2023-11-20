import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
const CustomSelector = (props) => {
  const { handleChange, value, fieldName, selectionOption } = props;
  const upperCaseFieldName = fieldName.toUpperCase();
  return (
    <FormControl fullWidth>
      <InputLabel id={`${fieldName}-select-label`}>
        {upperCaseFieldName}
      </InputLabel>
      <Select
        labelId={`${fieldName}-select-label`}
        label={upperCaseFieldName}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {selectionOption?.map((elem, idx) => (
          <MenuItem value={elem?.detail?.name || elem?.name || elem} key={idx}>
            {elem?.detail?.name || elem?.name || elem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelector;
