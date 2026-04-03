import React, { useEffect, useState } from 'react'
import "./home.css"
import { BrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom'
import Profile_card from '../../components/profilecard/profile_card'
import profile from '../../assets/profile.png'
import Profile from '../../components/Userprofile/profile'
import Chat from '../../components/chatlist/chat'
import Friends from '../friends_page/friends_page'
import Chatbox from '../Chatbox_page/chatbox'

const Home = () => {
  // localStorage.clear()
  const token = localStorage.getItem("token")
  const [frd_list, setfrd_list] = useState([])
  const [my_id , setid] = useState("")


  const get_friends = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/friends`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
    )
    const response = await request.json()
    // console.log(response)
    setfrd_list(response)
  }

  useEffect(()=>{
    get_friends()
  },[])


  if (!token) {
    return <Navigate to="/login" />
  }

  else {
    return (
      <div className='home_page'>
        <div className="chatpannel">
          <Profile setid = {setid}/>
          {/* <input type="text" className="search" /> */}
          <input type="text" className="search" placeholder='Search your chat' />
          <div className="chat_list">
            {frd_list.map((u, idx) => {
              return <Chat name={u["username"]} key={idx} id={u["id"]} />
            })}
          </div>
        </div>
        <div className="body">

          <Outlet context={{ refreshFriends: get_friends , my_id: my_id }}>

          </Outlet>

        </div>
      </div>
    )
  }
}
export default Home