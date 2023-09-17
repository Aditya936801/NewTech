import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "./index.css"

const Loader = () => {
  return (
    <div className="loader">
    <CircularProgress color='primary' />
    </div>
  )
}

export default Loader