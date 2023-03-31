

import { Link, Outlet,useNavigate } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import { ReactNotifications, Store } from 'react-notifications-component'
import Changepass from './Changepass'
import axios from 'axios'
import { toast } from 'react-toastify';
function Cart() {
    const navigate = useNavigate()
    let getauthen = () => axios.get(`/authentication`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['authentication'], getauthen, {})
    let [user, setuser] = useState(data)
    let [show,setshow] = useState(false)
    const changepassword =(e)=>{
        e.preventDefault();
        setshow(true)
    }
    const updateprofile = async( e)=>{
        e.preventDefault()
        let result = await axios.post('/user/updateprofile',user)
        console.log(result)
        if(result.data.isSuccess){
            navigate("/home")
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message)
        }
    }
  
   
  
    useEffect(() => {


    }, [data])
    if (isLoading) return <>...loading</>
    
    return (
        <div className="container">
            <Link to='/home'>Back to Home</Link>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Full Name</label>
                    <input type="text" class="form-control" onChange={(e) => { user.user.fullname = e.target.value; setuser({ ...user }) }} value={user.user.fullname} />
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" className="form-label">Gender ( Check is boy, not check is girl)</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input"  onClick={(e)=>{user.user.gender = e.target.checked ; setuser({...user})}} type="checkbox"checked={user.user.gender} />
                        <label class="form-check-label" > </label>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">gmail</label>
                    <input type="text" class="form-control" value={user.user.gmail} readOnly={true} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone Number</label>
                    <input type="text" class="form-control"onChange={(e) => { user.user.phone_number = e.target.value; setuser({ ...user }) }} value={user.user.phone_number} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Old</label>
                    <input type="number" class="form-control"onChange={(e) => { user.user.old = e.target.value; setuser({ ...user }) }} value={user.user.old} />
                </div>
                <button type="" className='btn btn-primary' onClick={changepassword}>change password</button>
                
                <br/>
                   <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700" onClick={updateprofile}>save</button>
            </form>
            {show?<Changepass show = {show} setshow= {setshow}/>:""}
        </div>

    );
}

export default Cart;
