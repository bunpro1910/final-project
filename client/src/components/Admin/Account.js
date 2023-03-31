
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from '../../models/getapi';
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'

import { ReactNotifications, Store } from 'react-notifications-component'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {toast} from 'react-toastify'
function Category() {

  let [search, setsearch] = useState({ s_id: '', s_name: '' })

  let getaccount = () => axios.get(`/admin/account?s_id=${search.s_id}&s_name=${search.s_name}`).then((res) => res.data)
  const [show, setshow] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const socketRef = useRef();
  console.log(!showsearch)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['account'], getaccount, { enabled: !showsearch })
  let [account, setaccount] = useState('')
  const handleClickOpen = (cate) => (e) => {
    setshow(true);
    setaccount(cate)
  };

  const handleClose = (e) => {
    setshow(false);
  };
  const handleClickOpenSearch = (e) => {
    setshowsearch(true);
  };
  const handleCloseSearch = (e) => {
    setsearch({ s_id: '', s_name: '' })
    setshowsearch(false);
  };
  const handleSearch = (e) => {
    setshowsearch(false);
  }
  const handledelete = async (e) => {
    let result = await axios.post(`/admin/deletecate`, { id: account.username })
    if(result.data.isSuccess){
      toast.success(result.data.message)
      setshow(false)
    }else{
      toast.error(result.data.message)
    }
    
  }
  useEffect(() => {

    socketRef.current = io.connect(`${process.env.REACT_APP_API_ENDPOINT}`)
    socketRef.current.on('deletecate', (args) => {
      refetch()
    })

  }, [data])
  if (isLoading) { return <>... loading</> }

  console.log(data)
  return (
    <>
      <Dialog open={show} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>
        <DialogTitle > Are you want to delete Category</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1} >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {account.username}
                  </td>
                  <td>
                    {account.password}
                  </td>
                  <td>
                    {account.roleid}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
            <button className="btn btn-danger" onClick={handledelete}>Delete</button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog open={showsearch} onClose={handleCloseSearch} scroll='paper' fullWidth={true} maxWidth='md'>
        <DialogTitle > Search</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1} >
            <form >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Account ID</label>
                <input type="text" onChange={(e) => { search.s_id = e.target.value; setsearch({ ...search }) }} value={search.s_id} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Role ID</label>

                <input type="text" onChange={(e) => { search.s_name = e.target.value; setsearch({ ...search }) }} value={search.s_name} class="form-control" />
              </div>
            </form>
          </DialogContentText>
          <DialogActions>
            <button className="btn btn-primary" onClick={handleCloseSearch}>Cancel</button>
            <button className="btn btn-danger" onClick={handleSearch}>Search</button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className="container">
        <Link to='../addaccount' className='btn btn-primary' >Add new Category</Link>
        <button className='btn btn-primary' onClick={handleClickOpenSearch} >Search</button>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Account ID</th>
              <th scope="col">Account Password</th>
              <th scope="col">Role </th>
              <th scope="col">Fullname </th>
              <th scope="col">Gender </th>
              <th scope="col">Phone Number </th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            {data.quantity > 0 ? data.account.map((acc, i) => {
              return (
                <tr key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{acc.username}</td>
                  <td>{acc.password}</td>
                  <td>{acc.roleid == 1 ? "user" : "admin"}</td>
                  <td>{acc.fullname}</td>
                  <td>{acc.gender ? "boy" : "girl"}</td>
                  <td>{acc.phone_number ? acc.phone_number : "null"}</td>
                  <td><Link to='../addaccount' className="btn btn-primary" state={{ id: acc.username }}>edit</Link></td>
                  <td><button className="btn btn-danger" onClick={handleClickOpen(acc)} type="">delete</button></td>
                </tr>
              )

            }) : data.account}

          </tbody>
        </table>
      </div>

    </>
  );
}

export default Category;
