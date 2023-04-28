

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
import { deletecart, getcart,updatecart } from '../../Models/getdata';
function Cart({ item,showcart,setshowcart }) {

    const [price,setprice] = useState(item.orderquantity)
    let navigate = useNavigate()
    let handle_delete = (proid, cartid) => async (e) => {
        let result = await deletecart(proid, cartid)
        if (result.data.isSuccess) {
     
            toast.success(result.data.message)
        } else {
            toast.error(result.data.message)
        }
    }
    const handleClose = (e) => {
        setshowcart(false)
    }
 
    const handleupdatecart =async (proid, cartid,quantity)  => {
        let result = updatecart(proid,cartid,quantity)
        if (result.data.isSuccess) {
            toast.success(result.data.message)
       
        } else {
            toast.error(result.data.message)
        }
    }
    const gotodetail = (id) => (e) => {
        navigate(`/productdetail?id=${id}`)
        setshowcart(false)
    }
    useEffect(() => {
    }, [])


    return (



        <div className='group flex relative cart-card px-1 hover:bg-slate-200'>
            <div className='block'>
                <div className="flex flex-row my-3 items-center">
                    <div className='relative'>
                        <img src={item.image} className="w-16 block" alt="" />
                        <span className="bg-red-300 py-1 px-2 rounded-full absolute " style={{ right: `-10px`, top: "-10px" }}>{item.orderquantity}</span>
                    </div>
                    <p className="ml-4 mr-32 hover:cursor-pointer" onClick={gotodetail(item.id)}>{item.name}</p>
                    <p className="mr-10 ml-auto flex flex-row">{item.price * item.orderquantity} <span> &#8363;</span></p>

                </div>
            </div>
            <div className="flex items-center w-10 mr-10 ml-auto">
                <input className="w-12 h-12 border-slate-700 border-2 rounded-xl text-center" type="number" name="" onChange={(e) => { setprice( e.target.value);handleupdatecart(item.id,item.cartid,e.target.value) }} value={price} />
            </div>
            <span role='button' onClick={handle_delete(item.id, item.cartid)} className="text-md absolute right-0 p-1 hover:cursor-pointer rounded-full hover:bg-red-400 " style={{ top: "-3px" }}>X</span>
        </div>



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
