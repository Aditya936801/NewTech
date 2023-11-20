import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
  } from "@mui/material";
  import { courses,shortCourses } from "../../../../../data/courses";
const CustomSelector = (props) => {
    const {handleChange,value,courseType} = props
    const isDiploma = courseType === "DIPLOMA"
  return (
    <FormControl fullWidth >
    <InputLabel id={isDiploma?"diploma-select-label":"course-select-label"}>{courseType}</InputLabel>
      <Select
        labelId={isDiploma?"diploma-select-label":"course-select-label"}
        label={courseType}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        { isDiploma && courses?.map((elem, idx) => (
          <MenuItem value={elem?.detail?.name} key={idx} >{elem?.detail?.name} </MenuItem>
        ))}
        { !isDiploma && shortCourses?.map((elem, idx) => (
          <MenuItem value={elem?.name} key={idx} >{elem?.name} </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CustomSelector