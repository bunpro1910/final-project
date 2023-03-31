
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios';
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'

import { ReactNotifications, Store } from 'react-notifications-component'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
function Invoice() {
  let [search, setsearch] = useState({
    s_id: '',
    s_userid: '',
    s_customer: '',
    s_cartid: '',
    s_phonenumber: '',
    s_email: '',
    s_status: ''
  })

  let getinvoice = () => axios.get(`/api/admin/invoice`, { params: { s_id: search.s_id, s_userid: search.s_userid, s_customer: search.s_customer, s_email: search.s_email, s_phonenumber: search.s_phonenumber, s_cartid: search.s_cartid, s_status: search.s_status } }).then((res) => res.data)
  const [show, setshow] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const [showdetail, setshowdetail] = useState(false)
  const socketRef = useRef();
  console.log(!showsearch)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['invoice'], getinvoice, { enabled: !showsearch })
  let [invoice, setinvoice] = useState('')
  const handleClickOpen = (inv) => (e) => {
    setshow(true);
    setinvoice(inv)
  };
  const handleClosedetail = (e) => {
    setshowdetail(false);
  };
  const handleClickOpendetail = (inv) => (e) => {
    setshowdetail(true);
    setinvoice(inv)
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
  const handleChangeStatus = (inv, status) => async (e) => {
    let result = await axios.post(`/api/admin/changestatus`, { id: inv.id, status: status })
    if (result.data.isSuccess) {
      toast.success(result.data.message)
    } else {
      toast.error(result.data.message)
    }
  }
  const handledelete = async (e) => {
    console.log(invoice.id)
    let result = await axios.post(`/api/admin/deleteinvoice`, { id: invoice.id })
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      setshow(false)
    } else {
      toast.error(result.data.message)
    }
  }
  useEffect(() => {

    socketRef.current = io.connect(`${process.env.REACT_APP_API_ENDPOINT}`)
    socketRef.current.on('updatestatus', (args) => {
      refetch()
    })
    socketRef.current.on('deleteinvoice', (args) => {
      refetch()
    })

  }, [data])
  if (isLoading) { return <>... loading</> }


  return (
    <>
      <ReactNotifications />
      <Dialog open={show} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>
        <DialogTitle > Are you want to delete invoice</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1} >
            <p>ID : {invoice.id}</p>
            <p>Customer Name : {invoice.name}</p>
            <p>Cart ID : {invoice.cartid}</p>
            <p>Address : {invoice.address}</p>
            <p>User ID : {invoice.userid}</p>
            <p>Phone Number : {invoice.phone_number}</p>
            <p>Email : {invoice.email}</p>
            <p>Date : {invoice.date}</p>
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
                <label for="exampleInputEmail1" class="form-label">invoice ID</label>
                <input type="text" onChange={(e) => { search.s_id = e.target.value; setsearch({ ...search }) }} value={search.s_id} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">User ID</label>
                <input type="text" onChange={(e) => { search.s_userid = e.target.value; setsearch({ ...search }) }} value={search.s_userid} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Customer Name</label>
                <input type="text" onChange={(e) => { search.s_customer = e.target.value; setsearch({ ...search }) }} value={search.s_customer} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Cart ID</label>
                <input type="text" onChange={(e) => { search.s_cartid = e.target.value; setsearch({ ...search }) }} value={search.s_cartid} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Phone Number</label>
                <input type="text" onChange={(e) => { search.s_phonenumber = e.target.value; setsearch({ ...search }) }} value={search.s_phonenumber} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="text" onChange={(e) => { search.s_email = e.target.value; setsearch({ ...search }) }} value={search.s_email} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Status</label>
                <select class="custom-select d-block w-100" id="state" required onChange={(e) => { search.s_status = e.target.value; setsearch({ ...search }) }} value={search.s_status}>
                  <option value="">Choose...</option>
                  <option value="1">Procesing</option>
                  <option value="2">Sucess</option>
                  <option value="3">Error</option>
                </select>

              </div>
            </form>
          </DialogContentText>
          <DialogActions>
            <button className="btn btn-primary" onClick={handleCloseSearch}>Cancel</button>
            <button className="btn btn-danger" onClick={handleSearch}>Search</button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={showdetail} onClose={handleClosedetail} scroll='paper' fullWidth={true} maxWidth='md'>
        <DialogTitle > Detail</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1} >
            <p>ID : {invoice.id}</p>
            <p>Customer Name : {invoice.name}</p>
            <p>Cart ID : {invoice.cart_id}</p>
            <p>Address : {invoice.address}</p>
            <p>User ID : {invoice.userid}</p>
            <p>Phone Number : {invoice.phone_number}</p>
            <p>Email : {invoice.email}</p>
            <p>Date : {invoice.date}</p>
            <p>statys : {invoice.status}</p>
          </DialogContentText>
          <DialogActions>
            <button className="btn btn-primary" onClick={handleClosedetail}>Cancel</button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className="container">
        <button className='btn btn-primary' onClick={handleClickOpenSearch} >Search</button>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">invoice ID</th>
              <th scope="col" >Cart ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Detail</th>
              <th scope="col">Delete</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>

            {data.quantity > 0 ? data.invoice.map((inv, i) => {
              return (

                <tr key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{inv.id}</td>
                  <td><Link to={'../cartdetail/' + inv.cart_id} >{inv.cart_id}</Link> </td>
                  <td>{inv.userid}</td>
                  <td>{inv.date}</td>
                  <td><Link to='../addinvoice' className="btn btn-primary" state={{ id: inv.id }}>edit</Link></td>
                  <td><button className="btn btn-primary" onClick={handleClickOpendetail(inv)} type="">detail</button></td>
                  <td><button className="btn btn-danger" onClick={handleClickOpen(inv)} type="">delete</button></td>
                  <td>
                    <button className="btn btn-danger btn-status" onClick={handleChangeStatus(inv, 3)} type="" disabled={inv.status == 3 ? true : false}></button>
                    <button className="btn btn-warning btn-status" onClick={handleChangeStatus(inv, 1)} type="" disabled={inv.status == 1 ? true : false}></button>
                    <button className="btn btn-success btn-status" onClick={handleChangeStatus(inv, 2)} type="" disabled={inv.status == 2 ? true : false}></button>
                  </td>
                </tr>
              )

            }) : data.invoice}

          </tbody>
        </table>
      </div>

    </>
  );
}

export default Invoice;
