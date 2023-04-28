
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'

import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'

import axios from 'axios'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
import socket from '../../Models/socket'
import { getaccount } from '../../Models/getdata'
import DetailAccount from '../Layout/Detail/Detailaccount'
import ConfirmDelete from '../Layout/Dialog/ConfirmDelete'
import Backbutton from '../Backbutton'
function Category() {

  let [search, setsearch] = useState({ s_id: '', s_name: '' })

  const [show, setshow] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['account'], getaccount(search), { enabled: !showsearch })
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
    let result = await axios.post('/api/admin/deleteuser', { id: account.id })
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      setshow(false)
    } else {
      toast.error(result.data.message)
    }
  }
  useEffect(() => {

    socket.on('deleteuser', (args) => {
      refetch()
    })

  }, [data])
  if (isLoading) { return <>... loading</> }

  console.log(data)
  return (
    <>
      {show ? <ConfirmDelete show={show} setshow={setshow} handledelete={handledelete} Content={<DetailAccount account={account} />} /> : ""}
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
        <Backbutton />
        <div className="w-[80%] mr-auto ml-auto">
          <Link to='../adduser' className=' bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' >Add new Account</Link>
          <button className=' ml-4 bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' onClick={handleClickOpenSearch} >Search</button>
        </div>
        <table class="table table-hover w-[70%] mr-auto ml-auto">

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
                  <td>{acc.rolename}</td>
                  <td>{acc.fullname}</td>
                  <td>{acc.gender ? "boy" : "girl"}</td>
                  <td>{acc.phone_number ? acc.phone_number : "null"}</td>
                  <td><Link to='../adduser' className="btn btn-primary" state={{ account: acc, isupdate: 1 }}>edit</Link></td>
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
