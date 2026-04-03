import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import './friends_page.css'
import Profile_card from '../../components/profilecard/profile_card'
import back from "../../assets/left.png"
// import users from '../home_page/home.jsx'

const Friends = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [users, set_users] = useState([])
  const { refreshFriends } = useOutletContext();


  const users_api = async () => {
    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      }
      )
      const respond = await request.json()

      if (!request.ok) {
        localStorage.clear()
        navigate("/login")
      }

      set_users(respond)
      // console.log(respond)


    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
  }

  useEffect(() => {
    users_api()
  }, [])

  // console.log(users)
  return (
    <div className="page">
      <div className="header">
        <img className="back" onClick={()=>{navigate(-1)}} src={back}></img>
        <h1>Suggested people,  You can Start chat </h1>
      </div>
      <div className="users_page">

        {users.map((u, idx) => (
          <Profile_card name={u["username"]} id={u["id"]} city={u["city"]} key={idx} refreshFriends={refreshFriends} refreshUsers={users_api} />
        )
        )}
        {/* <Profile_card/> */}
      </div>
    </div>
  )
}

export default Friends