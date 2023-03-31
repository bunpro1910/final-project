
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios';
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { ReactNotifications, Store } from 'react-notifications-component'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'

function Category() {
  let [search, setsearch] = useState(
    {
      s_id: '',
      s_name: '',
      s_cateid: '',
      s_price: { type: 'equal', value: '' },
      s_quantity: { type: 'equal', value: '' }
    }
  )

  const [show, setshow] = useState(false)
  const socketRef = useRef();

  const [showsearch, setshowsearch] = useState(false)
  let getproduct = () => axios.get(`/api/product`, { params: search }).then((res) => res.data)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['product'], getproduct, { enabled: !showsearch })
  const [product, setproduct] = useState('')
  const handleClickOpenSearch = (e) => {
    setshowsearch(true);
  };
  const handleCloseSearch = (e) => {
    setsearch({
      s_id: '',
      s_name: '',
      s_cateid: '',
      s_price: { type: 'equal', value: '' },
      s_quantity: { type: 'equal', value: '' }
    })
    setshowsearch(false);
  };
  const handleSearch = (e) => {
    e.preventDefault()
    setshowsearch(false)
  }
  const handleClickOpen = (pro) => (e) => {
    setshow(true);
    setproduct(pro)
  };
  const handleClose = (e) => {
    setshow(false);
  };
  const handledelete = async (e) => {
    let result = await axios.post(`/api/admin/deletepro`, { id: product.id })
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      setshow(false)
    } else {
      toast.error(result.data.message)
    }
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {

    if (show) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    socketRef.current = io.connect(`${process.env.REACT_APP_API_ENDPOINT}`)
    socketRef.current.on('deletepro', (args) => {
      refetch()
    })

  }, [show])

  if (isLoading) { return <>... loading</> }


  return (
    <div>
      <ReactNotifications />
      <Dialog
        open={show}
        onClose={handleClose}
        scroll='paper'
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle> Are you want to delete Product</DialogTitle>
        <DialogContent dividers={true}> <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
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
                  {product.id}
                </td>
                <td>
                  {product.name}
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
          <DialogContentText tabIndex={-1}>
            <form onSubmit={handleSearch}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Product ID</label>
                <input type="text" onChange={(e) => { search.s_id = e.target.value; setsearch({ ...search }) }} value={search.s_id} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Product Name</label>
                <input type="text" onChange={(e) => { search.s_name = e.target.value; setsearch({ ...search }) }} value={search.s_name} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Category Name</label>
                <input type="text" onChange={(e) => { search.s_cateid = e.target.value; setsearch({ ...search }) }} value={search.s_cateid} class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Price ID</label>
                <select class="form-select" onChange={(e) => { search.s_price.type = e.target.value; search.s_price.value = ''; setsearch({ ...search }) }} value={search.s_price.type}  >
                  <option value='equal' defaultValue={true}>Equal</option>
                  <option value='bigger' >Bigger than</option>
                  <option value='less'>Less than</option>
                  <option value='bigger_equal' >Bigger or Equal</option>
                  <option value='less_equal' >Less or Equal</option>
                  <option value='between' >between</option>
                </select>
                {search.s_price.type == "between" ?
                  <>
                    <input type="text" onChange={(e) => { search.s_price.value = { bigger: e.target.value, less: search.s_price.value.less }; setsearch({ ...search }) }} value={search.s_price.value.bigger} class="form-control" placeholder='less than' />
                    <input type="text" onChange={(e) => { search.s_price.value = { bigger: search.s_price.value.bigger, less: e.target.value }; setsearch({ ...search }) }} value={search.s_price.value.less} class="form-control" placeholder='bigger than' />
                  </> :
                  <input type="text" onChange={(e) => {
                    search.s_price.value = e.target.value; setsearch({ ...search })
                  }} value={search.s_price.value} class="form-control" placeholder={search.s_price.type} />
                }
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Price ID</label>
                <select class="form-select" onChange={(e) => { search.s_quantity.type = e.target.value; search.s_quantity.value = ''; setsearch({ ...search }) }} value={search.s_quantity.type}  >
                  <option value='equal' defaultValue={true}>Equal</option>
                  <option value='bigger' >Bigger than</option>
                  <option value='less' >Less than</option>
                  <option value='bigger_equal' >Bigger or Equal</option>
                  <option value='less_equal'>Less or Equal</option>
                  <option value='between' >between</option>
                </select>
                {search.s_quantity.type == "between" ?
                  <>
                    <input type="text" onChange={(e) => { search.s_quantity.value = { bigger: e.target.value, less: search.s_quantity.value.less }; setsearch({ ...search }) }} value={search.s_quantity.value.bigger} class="form-control" placeholder="bigger than" />
                    <input type="text" onChange={(e) => { search.s_quantity.value = { bigger: search.s_quantity.value.bigger, less: e.target.value }; setsearch({ ...search }) }} value={search.s_quantity.value.less} class="form-control" placeholder="less than" />

                  </> :
                  <input type="text" onChange={(e) => {
                    search.s_quantity.value = e.target.value; setsearch({ ...search })
                  }} value={search.s_quantity.value} class="form-control" placeholder={search.s_quantity.type} />
                }
              </div>
              <button className="btn btn-danger" type='submit' style={{ display: 'none' }} onClick={handleSearch}></button>
            </form>
          </DialogContentText>
          <DialogActions>
            <button className="btn btn-primary" onClick={handleCloseSearch}>Cancel</button>
            <button className="btn btn-danger" onClick={handleSearch}>Search</button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className="container">
        <Link to='../addproduct' className='btn btn-primary' >Add new Product</Link>
        <button className='btn btn-primary' onClick={handleClickOpenSearch} >Search</button>
        <table class="table ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category Name</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            {data.quantity == 0 ?
              data.product
              : data.product.map((product, i) => {
                return (
                  <tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.catename}</td>
                    <td>{product.brandname}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.description}</td>
                    <td><img src={process.env.REACT_APP_API_ENDPOINT+product.image} alt="avatar" className='img-thumbnail product-image' /></td>
                    <td><Link to='../addproduct' className='btn btn-primary' state={{ id: product.id }} >edit</Link></td>
                    <td><button className='btn btn-danger' onClick={handleClickOpen(product)}>Delete</button></td>
                  </tr>
                )
              })}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Category;
