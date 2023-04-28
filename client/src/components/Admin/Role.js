
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
import Detailrole from '../Layout/Detail/Detailrole'
import Search from '../Layout/Dialog/Search'
import FormSearchrole from '../Layout/Form/FormSearchRole'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { deleterole, gersearchrole } from '../../Models/getdata'
function Role() {
  let [role, setrole] = useState('')

  let [search, setsearch] = useState({ s_name: '', s_permission: '' })
  const [show, setshow] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['role'], gersearchrole(search), { enabled: !showsearch })
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { id: 'id', label: 'role ID', minWidth: 170 },
    { id: 'name', label: 'role Name', minWidth: 170 },
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
  const handleClickOpen = (r) => (e) => {
    setshow(true);
    setrole(r)
  };
  const handleClickOpenSearch = (e) => {
    setshowsearch(true);
  };
  const handleReset = (e) => {
    setsearch({ s_name: '', s_permission: '' })
    setshowsearch(false);
  };
  const handleSearch = (e) => {
    setshowsearch(false);
  }
  const handledelete = async (e) => {
    
    let result = await deleterole(role.id)
    if (result.data.isSuccess) {
      toast.success(result.data.message)
      setshow(false)
    } else {
      toast.error(result.data.message)
    }
  }
  useEffect(() => {
    socket.on('deleterole', (args) => {
      refetch()
    })

  }, [data])
  if (isLoading) { return <>... loading</> }
  let datarole = [{ name: "dont' have any role" }]
  if (data.quantity > 0) {
    datarole = data.role.reduce((init, item, i) => {
      init.push({ id: item.name, name: item.permission, edit: <Link to='../addrole' className="btn btn-primary" state={{ role: item }}><FiEdit /></Link>, delete: <button className="btn btn-danger" onClick={handleClickOpen(item)} type=""><RiDeleteBinLine /></button> })
      return init
    }, [])
  }

  return (
    <>

      {show ? <ConfirmDelete show={show} setshow={setshow} handledelete={handledelete} Content={<Detailrole role={role} />} /> : ""}
      {showsearch ? <Search show={showsearch} setshow={setshowsearch} handleSearch={handleSearch} handleReset={handleReset} form={<FormSearchrole search={search} handleSearch={handleSearch} setsearch={setsearch} />} /> : ""}
      <div className="container">
        <Backbutton />
        <div className="w-[70%] mr-auto ml-auto">
          <Link to='../addrole' className=' bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' >Add new Role</Link>
          <button className=' ml-4 bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' onClick={handleClickOpenSearch} >Search</button>
        </div>
        <Paper sx={{ width: '70%', marginTop: "20px",marginRight:"auto",marginLeft:"auto" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={1}>
                    Name
                  </TableCell>
                  <TableCell align="left" colSpan={1}>
                    Permission
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
                {datarole
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
            count={datarole.length}
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
              <th scope="col">role ID</th>
              <th scope="col">role Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            {data.quantity > 0 ? data.role.map((role, i) => {
              return (

                <tr key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td><Link to='../addrole' className="btn btn-primary" state={{ role: role }}><FiEdit /></Link></td>
                  <td><button className="btn btn-danger" onClick={handleClickOpen(role)} type=""><RiDeleteBinLine /></button></td>
                </tr>
              )

            }) : data.role}

          </tbody>
        </table> */}
      </div>

    </>
  );
}

export default Role;
