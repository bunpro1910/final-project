

import {Link, useLocation, useNavigate  }from 'react-router-dom'
import {useState,useEffect,useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from 'axios'
import { toast } from 'react-toastify'
import {getrole} from '../../Models/getdata'
import { useQuery, useQueries } from 'react-query'
import Backbutton from '../Backbutton'
function Login() {
  let navigate = useNavigate()
  
  const location = useLocation()
  const { isLoading, error, data, isFetching, refetch } = useQuery('role',getrole , {})
  let [form,setRegistefrom] = useState(location.state?.account ? {
    id: location.state.account.id,
    gmail:location.state.account.id,
    role: location.state.account.roleid,
    password: location.state.account.password,
    phonenumber: location.state.account.phone_number,
    fullname: location.state.account.fullname,
    old: location.state.account.old,
    gender: location.state.account.gender
  }:{
    gmail:'',
    role:'',
    password:'',
    phonenumber:'',
    fullname:'',
    old:'',
    gender:false,
  })
    let [err,seterr] = useState(false)
       let submit_handle= async(e)=> {
        e.preventDefault()
        let result
        if(location.state?.isupdate){
            let options = {form:form,isupdate:1}
            if(location.state?.account?.password != form.password){
                options = {...options,updatepass:1}
            }
            if(location.state?.account?.role != form.role){
                options = {...options,updaterole:1}
            }
            result = await axios.post('/api/admin/adduser',options)
        }else{
            result = await axios.post('/api/admin/adduser',{form:form})
        }

        if(result.data.isSucess){
          toast.success(result.data.message) 
            navigate('../account')    
        }else{
          toast.error(result.data.message)
        }
      }
      useEffect(()=>{

      },[])
      if(isLoading)return<>...loading</>
  return (
   
    <div className='container'>
      <Backbutton/>
      <div className='ml-40 mb-4'>
      <Link to='../account' className=' p-2 rounded-md text-white bg-slate-600 hover:bg-slate-700 hover:!text-white'>Back to List</Link>
      </div>
      <div className=" bg-slate-700 text-white w-4/5 mr-auto ml-auto p-4 rounded-md" >
      <form onSubmit={submit_handle}>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Gmail</label>
            <input type="gmail" readOnly={location.state?.isupdate ==1?true:false}  onChange={(ev)=>{form.gmail = ev.target.value ; setRegistefrom({...form})} } value={form.gmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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
          <label for="exampleInputEmail1" className="form-label">Add user</label>
          <select class="form-select" onChange={(ev)=>{form.role = ev.target.value ; setRegistefrom({...form})}} value={form.role} >
              <option value='-1' defaultValue={true}>Choose Role</option>
              {data.quantity == 0 ? <option value="">Don't have any Role</option> : data.role.map((role) => {
                return <option value={role.id} key={role.id}>{role.id} - {role.name}</option>
              })}
            </select>
           
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
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={(e)=>{form.gender = e.target.checked ; setRegistefrom({...form})}} checked= {form.gender}/>
            <label class="form-check-label" for="flexSwitchCheckDefault"> </label>
            </div>
          </div>
          <div className='btn-submit-wrap'>
              <button onClick={submit_handle} type='submit' className='bg-blue-600 p-2 !px-4 rounded-md hover:bg-blue-700'>{location.state?.isupdate?"Update User":"Add User"}</button>
          </div>
          </form>
      </div>
     
    </div>
  );
}

export default Login;
