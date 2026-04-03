import React from 'react'
import './chat_home.css'
import logo from '../../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'

const Chat_home = () => {
  const navigate = useNavigate()
  return (
    <div className='chat_home'>
          <img src={logo} alt="logo" className='chat_logo' />
          <button onClick={()=>{navigate("/friends")}}>Explore People</button>
    </div>
  )
}

export default Chat_home