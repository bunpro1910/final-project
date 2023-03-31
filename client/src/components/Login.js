

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from '../models/getapi'
import Forgetpassword from'./Forgetpassword'
import { toast } from 'react-toastify'
function Login() {
  let navigate = useNavigate()
  let [show,setshow] = useState(false)
  let [username, setusername] = useState('')
  let [password, setpassword] = useState('')

  let submit_handle = async (e) => {
    e.preventDefault()
    let { data } = await axios.post(`/authentication`, { username: username, password: password })
    if (data.isSuccess) {
      toast.success(data.message)
      navigate('/home')
    } else {
      toast.error(data.message)
    }
  }
  useEffect(() => {
  }, [])
  return (

    <div className='login-page'>
     
      <div className="login" >
        <form onSubmit={submit_handle}>
      
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">User Name</label>
            <input type="email" onChange={(e) => { setusername(e.target.value) }} value={username} className="form-control"   />
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Password</label>
            <input type="password" onChange={(e) => { setpassword(e.target.value) }} value={password} className="form-control"  />

          </div>

          <div className='btn-submit-wrap'>
            <button onClick={submit_handle} type='btn btn-primary' className='btn btn-primary btn-login'>Login</button>
          </div>
        </form>
        <button onClick={(e)=>{setshow(true)}} type="">Forgetpassword</button>
        {show?<Forgetpassword showforget ={true} setshowforget = {setshow} />:""}
      </div>

    </div>
  );
}

export default Login;
