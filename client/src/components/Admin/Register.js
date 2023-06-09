

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from 'axios'
import { toast } from 'react-toastify'
import {register} from'../../Models/getdata'

function Login() {
  let navigate = useNavigate()


  let [form, setRegistefrom] = useState({
    gmail: '',
    repassword: '',
    password: '',
    phonenumber: '',
    fullname: '',
    roleid: '',
    old: '',
    gender: false,
  })
  let [err, seterr] = useState(false)
  let submit_handle = async (e) => {
    e.preventDefault()
    let { data } = await register(form)
    if (data.isSucess) {
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
            <label for="exampleInputEmail1" className="form-label">Gmail</label>
            <input type="gmail" onChange={(ev) => { form.gmail = ev.target.value; setRegistefrom({ ...form }) }} value={form.gmail} className="form-control" />
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Full name</label>
            <input type="text" onChange={(ev) => { form.fullname = ev.target.value; setRegistefrom({ ...form }) }} value={form.fullname} className="form-control" />
          </div>
          <div className='mb-3'>
            <label className="form-label">Password</label>
            <input type="password" onChange={(ev) => { form.password = ev.target.value; setRegistefrom({ ...form }) }} value={form.password} className="form-control" />
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ border: err ? "red solid 1px" : "" }}>Renter Password</label>
            <input type="password" onChange={(ev) => { form.repassword = ev.target.value; setRegistefrom({ ...form }) }} value={form.repassword} className="form-control" />
          </div>
          <div className='mb-3'>
            <label className="form-label">Phone Number</label>
            <input type="text" onChange={(ev) => { form.phonenumber = ev.target.value; setRegistefrom({ ...form }) }} value={form.phonenumber} className="form-control" />
          </div>

          <div className='mb-3'>
            <label className="form-label">Old</label>
            <input type="number" onChange={(ev) => { form.old = ev.target.value; setRegistefrom({ ...form }) }} value={form.old} className="form-control" />
          </div>
          <div className='mb-3'>
            <label className="form-label">Role ID</label>
            <input type="number" onChange={(ev) => { form.roleid = ev.target.value; setRegistefrom({ ...form }) }} value={form.roleid} className="form-control" />
          </div>
          <div className='mb-3'>
            <label className="form-label">Gender ( Check is boy, not check is girl)</label>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" onClick={(e) => { form.gender = e.target.checked; setRegistefrom({ ...form }) }} />
              <label class="form-check-label" > </label>
            </div>
          </div>
          <div className='btn-submit-wrap'>
            <button onClick={submit_handle} type='submit' className='btn btn-primary btn-login'>Register</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Login;
