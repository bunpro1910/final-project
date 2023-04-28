

import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from 'axios'
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deletecart, getcart } from '../../Models/getdata';
import CartCard from'./CartCard'
import socket from '../../Models/socket';
function Cart({ showcart, setshowcart }) {

    const { isLoading, error, data, isFetching, refetch } = useQuery(['cart'], getcart, {})
    const handleClose = (e) => {
        setshowcart(false)
    }
    useEffect(() => {
        socket.on('reloadcart', (args) => {
            refetch()
          })
    }, [data])
    if (isLoading) return <></>

    return (
        <>
            <Dialog open={showcart} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>
                <DialogTitle >Your Cart</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText tabIndex={-1} >
                        {data.totalcart == 0 ? "don't have Any Product" : data.cart.map((item, i) => {
                            return <>
                               <CartCard item={item} showcart={showcart} setshowcart={setshowcart}/>
                            </>
                        })}

                        <p className='mr-4 mb-4 w-fit ml-auto'>Total : {data.totalcart == 0 ? 0 : data.cart.reduce((init, item) => init + (item.price * item.orderquantity), 0)}</p>


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    <Link className="btn btn-primary ml-4" to='/checkout' onClick={handleClose}>Checkout</Link>
                </DialogActions>
            </Dialog>
        </>

        // <div className="container">
        // <Link to='/home'>back to home</Link>
        // <table class="table">
        //     <thead>
        //         <tr>
        //             <th scope="col">NO</th>
        //             <th scope="col">Image</th>
        //             <th scope="col">Name</th>
        //             <th scope="col">Quantity in storage</th>
        //             <th scope="col">Price</th>
        //             <th scope="col">Order Quantity </th>
        //             <th scope="col">Delete</th>
        //             <th scope="col">Total</th>
        //         </tr>
        //     </thead>
        //     <tbody>

        //     </tbody>


        // </table>
        // <div className='total-bar'>

        //     <p className='total-title'>Total</p>
        //     <p className="total-value">{total} VND</p>

        // </div>
        // <div className='total-bar'>

        //     <Link to='/checkout'>checkout</Link>

        // </div>
        // </div>
    );
}

export default Cart;
