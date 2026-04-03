import React, { useState } from 'react'
import { Link, useNavigate,Navigate } from 'react-router-dom'

const Login_box = () => {
  const [usr, set_usr] = useState("")
  const [pass, set_pass] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [msg, setmsg] = useState("")

  function store_usr(e) {
    set_usr(e.target.value)
  }
  function store_pass(e) {
    set_pass(e.target.value)
  }

  const login_api = async (usr, pass) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": usr,
          "password": pass
        })
      }
      )
      const data = await response.json()
      // console.log(data)

      if (data.status===true && data.token){
        localStorage.setItem("token",data.token)
        return navigate("/")
      }
      else{
        setmsg(data.msg)
      }

    } catch (error) {
      console.log("network error")
    }

  }

  function submit(e) {
    e.preventDefault()
    console.log("form submitted \n username: ", usr, "\n password: ", pass)
    login_api(usr,pass)
    set_usr("")
    set_pass("")
  }

  if (token) {
      // return navigate("/")
      return <Navigate to="/" />
    }

  return (

    <form onSubmit={submit} className="signin_box">
      <h1 className='credential-head'>LOG IN</h1>

      <input type="text"
        placeholder='Username'
        value={usr}
        onChange={store_usr}
        required
      />

      <input type="password"
        placeholder="Password"
        value={pass}
        onChange={store_pass}
        required
      />

      <button className="create_acc">LOG IN</button>
      <p className='credential-para'>New Here? <Link to="/signup" className='link'>Sign Up</Link></p>
      <p className="validator_msg">{msg}</p>
    </form>
  )
}

export default Login_box