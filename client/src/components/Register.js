

import {Link, useNavigate  }from 'react-router-dom'
import {useState,useEffect,useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from '../models/getapi';
import { toast } from 'react-toastify'

function Login() {
  let navigate = useNavigate()
  
  
  let [form,setRegistefrom] = useState({
    gmail:'',
    repassword:'',
    password:'',
    phonenumber:'',
    fullname:'',
    old:'',
    gender:false,
  })
    let [err,seterr] = useState(false)
       let submit_handle= async(e)=> {
        e.preventDefault()
        let {data} = await axios.post(`/register`,{form:form})
        if(data.isSucess){
          toast.success(data.message)
        
  
            navigate('/home')

         
        }else{
          toast.error(data.message)
        }
      }
      useEffect(()=>{

      },[])
  return (
   
    <div className='login-page'>
      <ReactNotifications/>
      <div className="login" >
      <form onSubmit={submit_handle}>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Gmail</label>
            <input type="gmail"  onChange={(ev)=>{form.gmail = ev.target.value ; setRegistefrom({...form})} } value={form.gmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Full name</label>
            <input type="text"  onChange={(ev)=>{form.fullname = ev.target.value ; setRegistefrom({...form})} } value={form.fullname}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Password</label>
            <input type="password"  onChange={(ev)=>{form.password = ev.target.value ; setRegistefrom({...form})} } value={form.password}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label" style={{border:err?"red solid 1px":""}}>Renter Password</label>
            <input type="password"  onChange={(ev)=>{form.repassword = ev.target.value ; setRegistefrom({...form})}} value={form.repassword} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="text"  onChange={(ev)=>{form.phonenumber = ev.target.value ; setRegistefrom({...form})} } value={form.phonenumber} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>

          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Old</label>
            <input type="number"  onChange={(ev)=>{form.old = ev.target.value ; setRegistefrom({...form})} }value={form.old} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Gender ( Check is boy, not check is girl)</label>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={(e)=>{form.gender = e.target.checked ; setRegistefrom({...form})}}/>
            <label class="form-check-label" for="flexSwitchCheckDefault"> </label>
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
