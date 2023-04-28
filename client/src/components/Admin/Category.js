
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import socket from '../../Models/socket'
import { useQuery, useQueries } from 'react-query'
import { FiEdit } from 'react-icons/fi'
import Backbutton from '../Backbutton'
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import ConfirmDelete from '../Layout/Dialog/ConfirmDelete'
import Detailcategory from '../Layout/Detail/Detailcategory'
import Search from '../Layout/Dialog/Search'
import FormSearchCate from '../Layout/Form/FormSearchCate'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { deletecate, getsearchcategory } from '../../Models/getdata'
function Category() {
  let [search, setsearch] = useState({ s_id: '', s_name: '' })
  const [show, setshow] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['category'], getsearchcategory(search), { enabled: !showsearch })
  let [category, setcategory] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { id: 'id', label: 'Category ID', minWidth: 170 },
    { id: 'name', label: 'Category Name', minWidth: 170 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClickOpen = (cate) => (e) => {
    setshow(true);
    setcategory(cate)
  };
  const handleClickOpenSearch = (e) => {
    setshowsearch(true);
  };
  const handleReset = (e) => {
    setsearch({ s_id: '', s_name: '' })
    setshowsearch(false);
  };
  const handleSearch = (e) => {
    setshowsearch(false);
  }
  const handledelete = async (e) => {
    let result = await deletecate(category)
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      setshow(false)
    } else {
      toast.error(result.data.message)
    }
  }
  useEffect(() => {
    socket.on('deletecate', (args) => {
      refetch()
    })

  }, [data])
  if (isLoading) { return <>... loading</> }
  let datacategory =[{name:"dont' have any category"}]
  if(data.quantity>0){
    datacategory= data.category.reduce ((init,item,i)=>{
      init.push({id:item.id,name:item.name,edit:<Link to='../addcategory' className="btn btn-primary" state={{ cate: item }}><FiEdit /></Link>,delete:<button className="btn btn-danger" onClick={handleClickOpen(item)} type=""><RiDeleteBinLine /></button>})
      return init
    },[])
  }
 
  return (
    <>

      {show ? <ConfirmDelete show={show} setshow={setshow} handledelete={handledelete} Content={<Detailcategory cate={category} />} /> : ""}
      {showsearch ? <Search show={showsearch} setshow={setshowsearch} handleSearch={handleSearch} handleReset={handleReset} form={<FormSearchCate search={search} handleSearch={handleSearch} setsearch={setsearch} />} /> : ""}
      <div className="container">
        <Backbutton />
        <div className="w-[80%] mr-auto ml-auto">
          <Link to='../addcategory' className=' bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' >Add new Category</Link>
          <button className=' ml-4 bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' onClick={handleClickOpenSearch} >Search</button>
        </div>
        
        <Paper sx={{ width: '80%',marginTop:"20px",marginLeft:"auto",marginRight:"auto" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={1}>
                    ID
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Name
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
                {datacategory
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
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={datacategory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            {data.quantity > 0 ? data.category.map((cate, i) => {
              return (

                <tr key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{cate.id}</td>
                  <td>{cate.name}</td>
                  <td><Link to='../addcategory' className="btn btn-primary" state={{ cate: cate }}><FiEdit /></Link></td>
                  <td><button className="btn btn-danger" onClick={handleClickOpen(cate)} type=""><RiDeleteBinLine /></button></td>
                </tr>
              )

            }) : data.category}

          </tbody>
        </table> */}
      </div>

    </>
  );
}

export default Category;
