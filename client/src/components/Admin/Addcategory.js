

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import { addcate, updatecate, updateidcate } from '../../Models/getdata';
import Backbutton from '../Backbutton'
function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  let [category, setcategory] = useState(
    location.state?.cate ?
      {
        id: location.state.cate.id,
        name: location.state.cate.name,
      } :
      {
        id: '',
        name: '',

      }
  )

  const gotocate = (e) => {
    navigate('../category')
  }
  let submit_handle = async (e) => {
    e.preventDefault()
    let result
    if (!location.state?.cate) {
      result = await addcate(category)
    } else {
      if (category.id == location.state?.cate.id) {
        result = await updatecate(category)
      } else {
        result = await updateidcate(category, location.state?.cate.id)
      }

    }
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      navigate('../category')
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
        <Link to='../category' className='p-2 rounded-md text-white bg-slate-600 hover:bg-slate-700 hover:!text-white'>Back to List</Link>
        <form className="bg-slate-700 p-4 rounded-md text-white">

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Category ID</label>
            <input type="text" onChange={(e) => { category.id = e.target.value; setcategory({ ...category }) }} value={category.id} class="form-control" />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Category Name</label>
            <input type="text" class="form-control" onChange={(e) => { category.name = e.target.value; setcategory({ ...category }) }} value={category.name} />
          </div>
          <button type="submit btn btn-primary" onClick={submit_handle} class="btn btn-primary">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Login;
