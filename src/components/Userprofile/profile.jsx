import './profile.css'
import profile_pic from '../../assets/profile.png'
import React, { useEffect, useState } from 'react'

const Profile = ({setid}) => {
  const [usr, set_usr] = useState("")
  const token = localStorage.getItem("token")

  const user = async () => {

    try {
      const request = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      }
      )
      const response = await request.json()
      console.log(response)
      set_usr(response["username"])
      setid(response["id"])

      if (!request.ok) {
        if (request.status === 401|| request.status === 408) {
          localStorage.clear();
        }
        throw new Error("Request failed");
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    user()
  }, [])

  return (
    <div className="user-profile">
      <img src={profile_pic} alt="profile" className="profile-pic" />
      <h2>{usr}</h2>
      <p>Available</p>
    </div>
  )
}

export default Profile