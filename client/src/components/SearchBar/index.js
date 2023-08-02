import React from 'react'
import { TextField,InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import "./searchBar.css"

const SearchBar = ({placeholder="Search Admin"}) => {
  return (
    <div className="search-bar">
    <TextField
    label="Search"
    fullWidth
    placeholder={placeholder}
    InputProps={{
      startAdornment: (
          <InputAdornment position="start">
          <SearchIcon  />
          </InputAdornment>
          ),
        }}
        variant="outlined"
        />
        </div>
  )
}

export default SearchBar