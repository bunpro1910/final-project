

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from 'axios';
import { toast } from 'react-toastify';
function Cart() {
    let [quantity, setquantity] = useState(0)
    let getcart = () => axios.get(`/api/user/cart`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['cart'], getcart, {})
    let [total, settotal] = useState(0)
    let handle_delete = (proid, cartid) => async (e) => {
        let result = await axios.post(`/api/user/deletecart`, { proid: proid, cartid: cartid })
        if (result.data.isSuccess) {
            refetch()
            toast.success(result.data.message)
        } else {
            toast.error(result.data.message)
        }
    }
    const updatecart = (proid, cartid, type) => async (e) => {
        let result = await axios.post(`/api/user/updatecart`, { proid: proid, cartid: cartid, type: type })
        console.log(result)
        if (result.data.isSuccess) {
            toast.success(result.data.message)
            refetch()
        } else {
            toast.error(result.data.message)
        }
    }
    useEffect(() => {
    }, [data])
    if (isLoading) return <>...loading</>

    return (

        <div className="container">
            <ReactNotifications />
            <Link to='/home'>back to home</Link>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity in storage</th>
                        <th scope="col">Price</th>
                        <th scope="col">Order Quantity </th>
                        <th scope="col">Delete</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.totalcart > 0 ? data.cart.map((item, i) => {
                        total += item.price * item.orderquantity
                        return (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td><img style={{ maxWidth: 100 + "px" }} src={process.env.REACT_APP_API_ENDPOINT+item.image} alt="" /></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price} VND</td>
                                <td>{item.orderquantity}
                                    <button type="" className='btn-changequanti btn-up ' onClick={updatecart(item.id, item.cart_id, "up")}><i><BsFillArrowUpCircleFill /></i></button>
                                    <button type="" className='btn-changequanti btn-down' onClick={updatecart(item.id, item.cart_id, "down")}><i><BsFillArrowDownCircleFill /></i></button>
                                </td>
                                <td><button className='btn btn-danger' type="" onClick={handle_delete(item.id, item.cart_id)}>delete</button></td>
                                <td>{item.price * item.orderquantity} VND</td>
                            </tr>

                        )

                    }) : "don't have any cart"


                    }
                </tbody>


            </table>
            <div className='total-bar'>

                <p className='total-title'>Total</p>
                <p className="total-value">{total} VND</p>

            </div>
            <div className='total-bar'>

                <Link to='/checkout'>checkout</Link>

            </div>
        </div>
    );
}

export default Cart;
