import "./profile_card.css"
import profile from "../../assets/profile.png"

import React from 'react'

const Profile_card = ({ name, id, city, refreshFriends,refreshUsers }) => {
  const user_id = id
  const token = localStorage.getItem("token")
  const add_friend = async ()=>{
    const request = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/addfriend`,{
        method: "POST",
        headers:{
          "Authorization": "Bearer "+ token,
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          "frd_id":user_id
        })
      }
    )
    const response = await request.json()
    console.log(response)
    refreshUsers()
    refreshFriends()

  }


  return (
    <div className="card">
        <img className="profile_pic" src={profile} alt="profile-pic" />
        <p className="user_name">{name}</p>
        <p className="city">📍{city}</p>
        <button className="add_friend" onClick={add_friend}>Add to Chat</button>
    </div>
  )
}

export default Profile_card