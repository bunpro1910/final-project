
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import { useQuery, useQueries } from 'react-query'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
import socket from '../../Models/socket'
import FormSearchPro from '../Layout/Form/FormSearchPro'
import Search from '../Layout/Dialog/Search'
import { deletepro, getsearchproduct } from '../../Models/getdata'
import ConfirmDelete from '../Layout/Dialog/ConfirmDelete'
import Detailproduct from '../Layout/Detail/Detailproduct'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Backbutton from '../Backbutton'
import { FiEdit } from 'react-icons/fi';
import { FcViewDetails } from 'react-icons/fc';
import { RiDeleteBinLine } from 'react-icons/ri';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Detail from'../Layout/Dialog/Detail';
import Detailpro from '../Layout/Detail/Detailproduct'
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
  const columns = [
    { id: 'image', label: 'Image', maxWidth: 170 },
    { id: 'id', label: 'Product ID', minWidth: 170 },
    { id: 'name', label: 'Product Name', minWidth: 170 },
    { id: 'catename', label: 'Category name', minWidth: 170 },
    { id: 'brandname', label: 'Brand Name', minWidth: 170 },
    { id: 'price', label: 'Price', minWidth: 170 },
    { id: 'quantity', label: 'Quantity', minWidth: 170 },
    { id: 'detail', label: 'detail', minWidth: 170 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
  ];
  const [show, setshow] = useState(false)
  const [showdetail, setshowdetail] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const { isLoading, error, data, isFetching, refetch } = useQuery('product', getsearchproduct(search), { enabled: !showsearch })
  const [product, setproduct] = useState('')
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClickOpenSearch = (e) => {
    setshowsearch(true);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleReset = (e) => {
    setsearch({
      s_id: '',
      s_name: '',
      s_cateid: '',
      s_price: { type: 'equal', value: '' },
      s_quantity: { type: 'equal', value: '' }
    })
    setshowsearch(false)
  };
  const handleSearch = (e) => {
    e.preventDefault()
    setshowsearch(false)
  }
  const handleClickOpendetail = (pro) => (e) => {
    setshowdetail(true);
    setproduct(pro)
  };
  const handleClickOpen = (pro) => (e) => {
    setshow(true);
    setproduct(pro)
  };
  const handleClose = (e) => {
    setshowdetail(false);
  };
  const handledelete = async (e) => {
    let result = await deletepro(product)
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

    socket.on('deletepro', (args) => {
      refetch()
    })

  }, [show])

  if (error) return <>... eror</>

  if (isLoading) return <>...loading</>
  let dataproduct=[]
  if (data.quantity > 0) {
    dataproduct = data.product.reduce((init, item, i) => {
      init.push({
        id: item.id,
        name: item.name,
        catename: item.catename,
        brandname: item.brandname,
        image: <img className='w-[200px]' src={item.image} alt="" />,
        quantity: item.quantity,
        price: item.price,
        detail: <button className="btn btn-primary" onClick={handleClickOpendetail(item)} type=""><FcViewDetails /></button>,
        edit: <Link to='../addproduct' className="btn btn-primary" state={{ cate: item }}><FiEdit /></Link>,
        delete: <button className="btn btn-danger" onClick={handleClickOpen(item)} type=""><RiDeleteBinLine /></button>
      })
      return init
    }, [])
  }
  
  return (
    <div>
      {showdetail?<Detail show={showdetail} setshow={setshowdetail} Content={<Detailpro pro={product}/>}/>:""}
      {show ? <ConfirmDelete show={show} setshow={setshow} handledelete={handledelete} Content={<Detailproduct pro={product} />} /> : ""}
      {showsearch ? <Search show={showsearch} setshow={setshowsearch} handleSearch={handleSearch} handleReset={handleReset} form={<FormSearchPro search={search} handleSearch={handleSearch} setsearch={setsearch} />} /> : ""}


      <div className="container">
        <Backbutton />
        <div className="w-[90%] mr-auto ml-auto">
          <Link to='../addproduct' className=' bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' >Add new Product</Link>
          <button className=' ml-4 bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' onClick={handleClickOpenSearch} >Search</button>
        </div>

        <Paper sx={{ width: '100%', marginTop: "20px",height: 'auto' }}>
          <TableContainer sx={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={1}>
                    Image
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    ID
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Name
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Category Name
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Brand Name
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Price
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Quantity
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Detail
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Edit
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Delete
                  </TableCell>
                </TableRow>

              </TableHead>
              <TableBody>
                {dataproduct?dataproduct
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }):"don't have anyproduct"}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dataproduct.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

    </div>
  );
}

export default Category;
