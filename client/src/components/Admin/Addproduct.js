

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import { useQuery, useQueries } from 'react-query'
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
import Backbutton from '../Backbutton'
import Formdata from 'form-data'
import { addproduct, getbrand, getcategory, updateproduct } from '../../Models/getdata'
function Login() {
  const location = useLocation()
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const { isLoading, error, data, isFetching, refetch } = useQuery('category', getcategory, {})
  const { isLoading: isloadingbrand, error: errorbrand, data: brands, isFetching: isfetchingbrand, refetch: refetchbrand } = useQuery(['brand'], getbrand, {})
  const descriptionElementRef = useRef(null);
  let [product, setproduct] = useState(location.state?.product ? {
    id: location.state.product.id,
    name: location.state.product.name,
    cateid: location.state.product.cateid,
    price: location.state.product.price,
    quantity: location.state.product.quantity,
    brandid: location.state.product.brandid,
    description: location.state.product.description
  } :
    {
      id: '',
      name: '',
      cateid: '',
      price: '',
      quantity: '',
      image: '',
      brandid: '',
      description: '',
      strap: '',
      waterproof: ''
    }
  )
  const handleClose = (e) => {
    setshow(false);
    setproduct({
      id: '',
      name: '',
      cateid: '',
      price: '',
      quantity: '',
      image: '',
      brandid: '',
      description: '',
      strap: '',
      waterproof: ''
    })
  };
  const gotocate = (e) => {
    navigate('../product')
  }
  let submit_handle = async (e) => {
    e.preventDefault()
    let result
    let productform = new Formdata()
    productform.append('id', product.id)
    productform.append('name', product.name)
    productform.append('cateid', product.cateid)
    productform.append('price', product.price)
    productform.append('quantity', product.quantity)
    productform.append('brandid', product.brandid)
    productform.append('description', product.description)
    productform.append('image', product.image)
    productform.append('strap', product.strap)
    productform.append('waterproof', product.waterproof)
    if (!location.state?.product.id) {
      productform.append('isupdated', false)
      result = await addproduct(productform)
    } else {
      if (product.id == location.state?.product.id) {
        productform.append('isupdated', true)
        result = await updateproduct(productform)
      } else {
        productform.append('isupdated', true)
        productform.append('isupdatedid', true)
        productform.append('oldid', location.state?.product.id)
        result = await updateproduct(productform)
    
      }
    }
    if (result.data.isSuccess) {
        setshow(true)
        toast.success(result.data.message)
    } else {
      toast.error(result.data.message)
    }


  }

  useEffect(() => {

    if (show) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }



  }, [])
  if (isLoading) return (<>...loading</>)
  if (isloadingbrand) return (<>...loading</>)

  return (
    <>
      <Dialog
        open={show}
        onClose={handleClose}
        scroll='paper'
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle id="scroll-dialog-title">View</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Do You Want to add another Product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary" onClick={gotocate}>Back to Product</button>
          <button className="btn btn-primary" onClick={handleClose}>Add new Product</button>

        </DialogActions>
      </Dialog>

      <div className="container justify-center">
        <Backbutton/>
        <div className="w-full mb-10 ml-40">
        <Link to='../product' className='p-2 rounded-md text-white bg-slate-600 hover:bg-slate-700 hover:!text-white'>Back to List</Link>
        </div>
        <form className="bg-slate-700 p-4 shadow
       rounded-md text-white w-4/5 mr-auto ml-auto">
          <div class="mb-3">
            <label class="form-label">Product ID</label>
            <input placeholder="Enter Product ID..."type="text" onChange={(e) => { product.id = e.target.value; setproduct({ ...product }) }} value={product.id} class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input placeholder='Enter Product Name...' type="text" class="form-control" onChange={(e) => { product.name = e.target.value; setproduct({ ...product }) }} value={product.name} />
          </div>
          <div class="mb-3">
            <label class="form-label">Category ID</label>
            <select class="form-select" onChange={(e) => { product.cateid = e.target.value; setproduct({ ...product }) }} value={product.cateid}  >
              <option value='-1' defaultValue={true}>Choose Category</option>
              {data.quantity == 0 ? <option value="">don't have any brands</option> : data.category.map((cate) => {
                return <option value={cate.id} key={cate.id}>{cate.id} - {cate.name}</option>
              })}
            </select>

          </div>
          <div class="mb-3">
            <label class="form-label">Brand Name</label>
            <select class="form-select" onChange={(e) => { product.brandid = e.target.value; setproduct({ ...product }) }} value={product.brandid}  >
              <option value='-1' defaultValue={true}>Choose Brands</option>
              {brands.quantity == 0 ? <option value="">don't have any brands</option> : brands.brand.map((bra) => {
                return <option value={bra.id} key={bra.id}>{bra.id} - {bra.name}</option>
              })}
            </select>

          </div>
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input type="text" placeholder='Enter Product Price...' class="form-control" onChange={(e) => { product.price = e.target.value; setproduct({ ...product }) }} value={product.price} />
          </div>
          <div class="mb-3">
            <label class="form-label">Quantity</label>
            <input type="number" onChange={(e) => { product.quantity = e.target.value; setproduct({ ...product }) }} value={product.quantity} class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Strap</label>
            <input type="text" onChange={(e) => { product.strap = e.target.value; setproduct({ ...product }) }} value={product.strap} class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Waterproof</label>
            <input type="text" onChange={(e) => { product.waterproof = e.target.value; setproduct({ ...product }) }} value={product.waterproof} class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <input type="file" class="form-control" onChange={(e) => { product.image = e.target.files[0]; setproduct({ ...product }) }} />
          </div>

          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea rows='5' type="text" class="form-control" onChange={(e) => { product.description = e.target.value; setproduct({ ...product }) }} value={product.description} />
          </div>
          <button type="submit btn-btn-primary" onClick={submit_handle} class="btn btn-primary">Submit</button>
        </form>
      </div>
    </>

  );
}

export default Login;
