import React, { useState } from 'react'
import "./credential.css"
import logo from "../../assets/logo.jpg"
import { Outlet } from 'react-router-dom'

const Credential = () => {
    
  return (
    <div className="signin_page">
        
        <div className="logo">
            <img className= "logo_img" src={logo} alt="logo" />
        </div>
        <div>
          <Outlet/>
        </div>

    </div>
  )
}

export default Credential