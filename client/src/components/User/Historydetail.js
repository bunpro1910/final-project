

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
function Cart({ cart, showdetail, setshowdetail }) {
    const handleClose = (e) => {
        setshowdetail(false)
    }
    if (!cart) {
        return <></>
    }
    return (

        <Dialog
            open={showdetail}
            onClose={handleClose}
            scroll='paper'
            fullWidth={true}
            maxWidth='md'
        >
            <DialogTitle>Invoice Detail</DialogTitle>
            <DialogContent dividers={true}> <DialogContentText tabIndex={-1}>

                <div className='w-full'>
                    <div className="w-[70%] mr-auto ml-auto grid grid-cols-2 gap-y-3
                ">
                        <div>
                            <h1 className='py-1'>Order ID</h1>
                            <h1 className='py-1'>Address</h1>
                            <h1 className='py-1'>Date</h1>
                            <h1 className='py-1'>Time</h1>
                            <h1 className='py-1'>Phone Number</h1>
                            <h1 className='py-1'>Email</h1>
                            <h1 className='py-1'>Type</h1>
                            <h1 className='py-1'>E-payment ID</h1>
                        </div>
                        <div>
                            <h1 className='py-1'>{cart?.id}</h1>
                            <h1 className='py-1'>{cart?.address}</h1>
                            <h1 className='py-1'>{new Date(cart.date)?.getDate()}- {new Date(cart?.date).getMonth() + 1}- {new Date(cart?.date).getFullYear()}</h1>
                            <h1 className='py-1'>{new Date(cart.date)?.getHours()}:{new Date(cart?.date).getMinutes() + 1}:{new Date(cart?.date).getSeconds()}</h1>
                            <h1 className='py-1'>{cart?.phone_number}</h1>
                            <h1 className='py-1'>{cart?.email}</h1>
                            <h1 className='py-1'>{cart?.type}</h1>
                            <h1 className='py-1'>{cart?.payalid}</h1>
                        </div>

                    </div>
                    <button className="btn btn-primary mr-2 ml-auto flex" onClick={handleClose}>Cancel</button>

                </div>

            </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default Cart;
