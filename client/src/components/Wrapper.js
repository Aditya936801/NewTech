import React from 'react'
import Basicfooter from './Footer'
import Navbar from './Navbar'

const Wrapper = ({children}) => {
  return (
    <div>
    <Navbar/>
    {children}
    <Basicfooter/>
    </div>
  )
}

export default Wrapper