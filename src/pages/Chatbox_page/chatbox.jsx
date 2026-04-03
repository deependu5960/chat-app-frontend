import React, { useEffect, useState } from 'react'
import './chatbox.css'
import profile_pic from '../../assets/profile.png'
import call from '../../assets/call.png'
import v_call from '../../assets/videocall.png'
import i_icon from '../../assets/i.png'
import plus_icon from '../../assets/plus1.png'
import send from '../../assets/send.jpg'
import back from "../../assets/left.png"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

const Chatbox = (props) => {
    // variables for msg
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [messages, addmessage] = useState([])
    const [msg, setmessage] = useState("")
    const [usr, set_usr] = useState("")
    const { id } = useParams()
    const { my_id } = useOutletContext()

    useEffect(() => {
        const get_user = async () => {
            
            const request = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/chat_user?user_id=${id}`, {
                method: "GET"
            }
            );
            const response = await request.json()
            // console.log(response)
            set_usr(response["username"])
        }
        get_user()
        addmessage([])
        get_msg()
    }, [id]
    )


    const send_api = async () => {
        const request = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/msg`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "receiver_id": id,
                "msg": msg
            })
        }
        )
        const response = await request.json()
        // console.log(response)
        get_msg()
    }

    const get_msg = async () => {

        const request = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/getmsg?receiver_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        }
        )
        const response = await request.json()

        addmessage(response);

    }


    function chatsender(e) {
        e.preventDefault()
        console.log(msg)
        setmessage("")
        send_api()
    }

    // console.log(messages)

    useEffect(() => {
        const interval = setInterval(() => {
            get_msg(); // fetch messages
        }, 5000); // 5 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, [id]); // empty dependency array = run once on mount

    return (
        <div className='chat_box'>
            <div className="toplayer">
                <div className="contactinfo">
                    <img className="back" onClick={()=>{navigate(-1)}} src={back}></img>
                    <img className="user-pic" src={profile_pic} alt="DP" />
                    <h3>{usr}</h3>
                </div>
                <div className="contact">
                    <img src={call} alt="call" />
                    <img src={v_call} alt="video_call" />
                    <img src={i_icon} alt="i_icon" />
                </div>
            </div>
            <div className="chatmsg">

                {
                    messages.map((message, index) => (

                        message.sender_id === my_id ? (
                            <div className="sending" key={index}>{message.msg}</div>
                        ) : (
                            <div className="receiving" key={index}>{message.msg}</div>
                        )
                    ))
                }

            </div>
            <div className="msg_bar">
                <form className="bar" onSubmit={chatsender}>
                    <img src={plus_icon} alt="+" />
                    <input type='text' placeholder='Type a message...' value={msg} onChange={(e) => setmessage(e.target.value)} />
                    <img src="https://cdn-icons-png.freepik.com/512/3682/3682301.png" alt="mic" />
                    <img type='submit' src="https://cdn-icons-png.flaticon.com/512/3682/3682321.png" alt="send" onClick={chatsender} />

                </form>
            </div>
        </div>
    )
}

export default Chatbox