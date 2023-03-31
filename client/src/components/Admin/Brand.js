
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'

import {FiEdit} from 'react-icons/fi'

import {RiDeleteBinLine} from 'react-icons/ri'
import { ReactNotifications, Store } from 'react-notifications-component'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {toast} from 'react-toastify'
function Brand() {
  let [search, setsearch] = useState({ s_id: '', s_name: '' })
  
  let getbrand = () => axios.get(`/brand?s_id=${search.s_id}&s_name=${search.s_name}`).then((res) => res.data)
  const [show, setshow] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const socketRef = useRef();
  console.log(!showsearch)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['brand'], getbrand, {enabled:!showsearch})
  let [brand, setbrand] = useState('')
  const handleClickOpen = (cate) => (e) => {
    setshow(true);
    setbrand(cate)
  };
  const handleClose = (e) => {
    setshow(false);
  };
  const handleClickOpenSearch = (e) => {
    setshowsearch(true);
  };
  const handleCloseSearch = (e) => {
    setsearch({s_id:'',s_name:''})
    setshowsearch(false);
  };
  const handleSearch=(e)=>{
    setshowsearch(false);
  }
  const handledelete = async (e) => {
    let result = await axios.post('/admin/deletebrand', { id: brand.id })
    if (result.data.isSuccess) {
      if(result.data.isSuccess){
        toast.success(result.data.message)
        setshow(false)
      }else{
        toast.error(result.data.message)
      }
    }
  }
  useEffect(() => {

    socketRef.current = io.connect('http://localhost:3001')
    socketRef.current.on('deletecate', (args) => {
      refetch()
    })

  }, [data])
  if (isLoading) { return <>... loading</> }


  return (
    <>
      <ReactNotifications />
      <Dialog open={show} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>
        <DialogTitle > Are you want to delete brand</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1} >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {brand.id}
                  </td>
                  <td>
                    {brand.name}
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
                <label for="exampleInputEmail1" class="form-label">brand ID</label>
                <input type="text" onChange={(e) => { search.s_id = e.target.value; setsearch({ ...search }) }} value={search.s_id} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">brand Name</label>
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
        <Link to='../addbrand' className='btn btn-primary' >Add new brand</Link>
        <button  className='btn btn-primary' onClick={handleClickOpenSearch} >Search</button>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">brand ID</th>
              <th scope="col">brand Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            
            {data.quantity>0?data.brand.map((bra, i) => {
              return (

                <tr key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{bra.id}</td>
                  <td>{bra.name}</td>
                  <td><Link to='../addbrand' className="btn btn-primary" state={{ id: bra.id }}><FiEdit/></Link></td>
                  <td><button className="btn btn-danger" onClick={handleClickOpen(bra)} type=""><RiDeleteBinLine/></button></td>
                </tr>
              )

            }):data.brand}

          </tbody>
        </table>
      </div>

    </>
  );
}

export default Brand;
