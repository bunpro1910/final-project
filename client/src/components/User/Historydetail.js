

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import axios from 'axios'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Cart({ cart ,showdetail,setshowdetail}) {
    const handleClose =(e)=>{
        setshowdetail(false)
    }
    if(!cart){
        return<></>
    }
    return (

        <Dialog
            open={showdetail}
            onClose={handleClose}
            scroll='paper'
            fullWidth={true}
            maxWidth='md'
        >
            <DialogTitle> Are you want to delete Product</DialogTitle>
            <DialogContent dividers={true}> <DialogContentText  tabIndex={-1}>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Order ID</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Type</th>
                            <th scope="col">PayalID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#{cart?.id}</td>
                            <td>{cart?.address}</td>
                            <td>{new Date(cart.date)?.getDate()}- {new Date(cart?.date).getMonth() + 1}- {new Date(cart?.date).getFullYear()}</td>
                            <td>{new Date(cart.date)?.getHours()}:{new Date(cart?.date).getMinutes() + 1}:{new Date(cart?.date).getSeconds()}</td>
                            <td>{cart?.phone_number}</td>
                            <td>{cart?.email}</td>
                            <td>{cart?.type}</td>
                            <td>{cart?.payalid}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
             
            </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default Cart;
