import React, { useEffect, useState } from 'react'
import './chat.css'
import profile from '../../assets/profile.png'
import { useNavigate } from 'react-router-dom'

const Chat = (props) => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const id = props.id
  const [last_msg, setmsg] = useState("")
  const [msg_time, settime] = useState("")

  const open_chat = () => {
    navigate(`/user/${id}`)
  }

  const get_msg = async () => {

    const request = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/getmsg?receiver_id=${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      }
    }
    )
    const response = await request.json()

    // addmessage(response);

    let msg = ""
    let time = ""

    for (let u of response) {
      msg = u.msg
      time = u.msg_time
      // console.log(u.msg)
    }
    setmsg(msg)
    const formattedTime = time.slice(11, 16); // takes characters 11 to 15
    settime(formattedTime)
  }

  useEffect(() => {
    get_msg()
  }, [])




  return (
    <div className="cht" onClick={open_chat}>
      <img src={profile} alt="user-pic" className="pic" />
      <div className="cht_info">
        <div className="user">
          <h2>{props.name}</h2>
          <p>{msg_time}</p>
        </div>
        <p>{last_msg}</p>
      </div>
    </div>
  )
}

export default Chat