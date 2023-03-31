

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import { useQuery, useQueries } from 'react-query'
import axios from '../../models/getapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'

import Formdata from 'form-data'
function Login() {
  const location = useLocation()
  const [enable, setenable] = useState(false)
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  let getbrand = () => axios.get(`/brand`).then((res) => res.data)
  let getcategory = () => axios.get(`/category`).then((res) => res.data)
  let getproduct = () => axios.get(`/product?id=${location.state.id}`).then((res) => res.data)
  const { isLoading, error, data, isFetching, refetch } = useQuery('category', getcategory, {})
  const { isLoading: isloadingproduct, error: errorproduct, data: dataproduct, isFetching: isfetchingproduct, refetch: refetchproduct } = useQuery(['product', !location.state ? "" : location.state.id], getproduct)
  const { isLoading: isloadingbrand, error: errorbrand, data: brands, isFetching: isfetchingbrand, refetch: refetchbrand } = useQuery(['brand'], getbrand, {})
  const descriptionElementRef = useRef(null);
  let [product, setproduct] = useState(
    {
      id: '',
      name: '',
      cateid: '',
      price: '',
      quantity: '',
      image: '',
      brandid: '',
      description: ''
    }
  )
  const handleClose = (e) => {
    setshow(false);
    setproduct({ id: '', name: '' })
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

    if (!location.state?.id) {
      productform.append('isupdated', false)
      result = await axios.post(`/admin/addproduct`, productform, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      if (product.id == dataproduct.product[0].id) {
        productform.append('isupdated', true)
        result = await axios.post(`/admin/addproduct`, productform, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } else {
        productform.append('isupdated', true)
        productform.append('isupdatedid', true)
        productform.append('oldid', dataproduct.product[0].id)
        result = await axios.post(`/admin/addproduct`, productform, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }
    if (result.data.isSuccess) {
      if (!enable) {
        setshow(true)
        toast.success(result.data.message)
      } else {
        navigate('../product')
      }

    } else {
      toast.error(result.data.message)
    }


  }

  useEffect(() => {
    if (location.state) {
      if (location.state.id) {
        if (dataproduct) {
          product.id = dataproduct.product[0].id
          product.name = dataproduct.product[0].name
          product.cateid = dataproduct.product[0].cateid
          product.price = dataproduct.product[0].price
          product.quantity = dataproduct.product[0].quantity
          product.image = dataproduct.product[0].image
          product.description = dataproduct.product[0].description
          product.brandid = dataproduct.product[0].brandid
          setproduct({ ...product })

        }
      }
    }
    if (show) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (enable) {
      console.log(dataproduct)


    }

  }, [dataproduct])
  if (isloadingproduct) return (<>...loading</>)

  if (isLoading) return (<>...loading</>)
  if (isloadingbrand) return (<>...loading</>)
  console.log(dataproduct.product[0].brandid)
  console.log(product.brandid)
  return (
    <>
      <ReactNotifications />
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

      <div className="container">

        <Link to='../product'>Back to List</Link>
        <form className="bg-teal-300 p-4
       rounded-md">
          <div class="mb-3">
            <label class="form-label">Product ID</label>
            <input type="text" onChange={(e) => { product.id = e.target.value; setproduct({ ...product }) }} value={product.id} class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input type="text" class="form-control" onChange={(e) => { product.name = e.target.value; setproduct({ ...product }) }} value={product.name} />
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
            <input type="text" class="form-control" onChange={(e) => { product.price = e.target.value; setproduct({ ...product }) }} value={product.price} />
          </div>
          <div class="mb-3">
            <label class="form-label">Quantity</label>
            <input type="text" onChange={(e) => { product.quantity = e.target.value; setproduct({ ...product }) }} value={product.quantity} class="form-control" />
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
