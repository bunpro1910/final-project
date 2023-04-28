

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from 'axios'
import Forgetpassword from './Forgetpassword'
import { toast } from 'react-toastify'

function Login() {
  let navigate = useNavigate()
  let [show, setshow] = useState(false)
  let [username, setusername] = useState('')
  let [password, setpassword] = useState('')

  let submit_handle = async (e) => {
    e.preventDefault()
    let { data } = await axios.post('/api/authentication', { username: username, password: password })
    if (data.isSuccess) {
      toast.success(data.message)
      window.location.href = '/'
    } else {
      toast.error(data.message)
    }
  }
  useEffect(() => {
  }, [])
  return (

    <div className='w-full mt-36 text-xl'>

      <div className="w-2/5 p-5 bg-slate-700 text-white rounded-md mt-10 mr-auto ml-auto" >
        <form onSubmit={submit_handle}>

          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">User Name</label>
            <input name="email" type="email" onChange={(e) => { setusername(e.target.value) }} value={username} className="form-control" />
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Password</label>
            <input name="password" type="password" onChange={(e) => { setpassword(e.target.value) }} value={password} className="form-control" />

          </div>

          <div className='btn-submit-wrap flex'>
            <button type='btn btn-primary' className='btn btn-primary btn-login mr-auto ml-auto'>Login</button>
          </div>
        </form>
        <button onClick={(e) => { setshow(true) }} className='btn btn-primary mt-4' type="">Forgetpassword</button>
        {show ? <Forgetpassword showforget={true} setshowforget={setshow} /> : ""}
      </div>

    </div>
  );
}

export default Login;
