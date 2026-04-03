import React, { useState } from 'react';
import { Link , Navigate, useNavigate} from 'react-router-dom'


const Signin_box = () => {

  const [usr, set_usr] = useState("")
  const [pass, set_pass] = useState("")
  const [eml, set_eml] = useState("")
  const [cty, set_cty] = useState("")
  const token = localStorage.getItem("token")
  const [msg,setmsg] = useState("")
  const [err,seterr] = useState("")
  const navigate = useNavigate()

  function store_usr(e) {
    set_usr(e.target.value)
  }
  function store_pass(e) {
    set_pass(e.target.value)
  }

  function store_eml(e) {
    set_eml(e.target.value)
  }

  function store_cty(e) {
    set_cty(e.target.value)
  }

  const signup_api = async (usr, pass, eml , cty) => {
    try {
      seterr("")
      setmsg("")

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": usr,
          "password": pass,
          "email": eml,
          "city" : cty
        })
      }
      )
      const data = await response.json()


      if (!response.ok) {
        console.log("Backend error:", data);  // 👈 handles 422, 400 etc
        seterr(data.details || "Username Already Exists");
        return ;
        
      }

      // console.log("Success:", data);
      setmsg("Your Account has been created, you can login...")


    } catch (error) {
      console.log("Network error:", error);
    }
  }


  function submit(e) {
    e.preventDefault()
    // console.log("form submitted \n username: ", usr, "\n email: ", eml, "\n password: ", pass)
    signup_api(usr, pass, eml , cty)
    set_usr("")
    set_pass("")
    set_eml("")
    set_cty("")
  }

  if (token) {
    // return navigate("/")
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={submit} className="signin_box">
      <h1 className='credential-head'>SIGN UP</h1>

      <input type="text"
        placeholder='Username'
        value={usr}
        onChange={store_usr}
        required
      />

      <input type="password" placeholder="Password"
        value={pass}
        onChange={store_pass}
        required
      />

      <input type="email" placeholder='Email'
        value={eml}
        onChange={store_eml}
        required
      />

      <input type="text" placeholder='City'
        value={cty}
        onChange={store_cty}
        required
      />

      <button className="create_acc">SIGN UP</button>
      <p className='credential-para'>Already have account? <Link to="/login" className='link'>LOG IN</Link></p>
      <p style={{ color: 'rgb(47, 255, 151)' }} className="validator_msg">{msg}</p>
      <p style={{ color: 'red' }} className="err_msg">{err}</p>
    </form>
  )
}

export default Signin_box