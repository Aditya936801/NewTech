import React from 'react'
import { TextField,InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import "./searchBar.css"

const SearchBar = (props) => {
  const {placeholder="Search Admin",handleSearch,query} = props
  return (
    <div className="search-bar">
    <TextField
    label="Search"
    fullWidth
    placeholder={placeholder}
    value={query}
    onChange={handleSearch}
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