

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import { addcate, addrole, updatecate, updateidcate, updaterole } from '../../Models/getdata';
import Backbutton from '../Backbutton'
function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state)
  let [role, setrole] = useState(
    location.state?.role ?
      {
        id:location.state.role.id,
        name: location.state.role.name,
        permission:location.state.role.permissionid,
      } :
      {
        id: '',
        permission: '',

      }
  )

  let submit_handle = async (e) => {
    e.preventDefault()
    let result
    if (!location.state?.role) {
      result = await addrole(role)
    } else {
      if (role.id == location.state?.role.id) {
        result = await updaterole(role)
      } else {
        result = await updaterole(role, location.state?.role.id)
      }

    }
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      navigate('../role')
    } else {
      toast.error(result.data.message)
    }

  }

  useEffect(() => {


  }, [])


  return (
    <>


      <div className="container">
        <Backbutton/>
        <Link to='../role' className='p-2 rounded-md text-white bg-slate-600 hover:bg-slate-700 hover:!text-white'>Back to List</Link>
        <form className="bg-slate-700 p-4 rounded-md text-white">

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Role Name</label>
            <input type="text" onChange={(e) => { role.name = e.target.value; setrole({ ...role }) }} value={role.name} class="form-control" />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Permission</label>
            <select class="form-select"onChange={(e) => { role.permission = e.target.value; setrole({ ...role }) }} value={role.permission}  >
              <option value='-1' defaultValue={true}>Choose Permission</option>
                <option value={1} >User</option>
                <option value={2} >Admin</option>
                <option value={3} >Manager</option>
            </select>
          
          </div>
          <button type="submit btn btn-primary" onClick={submit_handle} class="btn btn-primary">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Login;
