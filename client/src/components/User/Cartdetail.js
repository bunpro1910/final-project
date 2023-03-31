

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import axios from '../../models/getapi';
function Cart({product,setProduct}) {
    
    let [quantity, setquantity] = useState(0)
    let getcart = () => axios.get(`/user/cart`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['cart'], getcart, {})

    let [total, settotal] = useState(0)

    useEffect(() => {


    }, [data])
    if (isLoading) return <>...loading</>
    setProduct(data.cart)
    return (

        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill" style={{color:"black"}}>{data.totalcart}</span>
            </h4>
            <ul class="list-group mb-3">
                {data.totalcart > 0 ? data.cart.map((item, i) => {
                     total+=item.price *item.orderquantity
                    return (
                       <>
                        <li class="list-group-item d-flex justify-between lh-condensed">
                            <div className='flex'>
                            <img className='w-10 mr-10' src={process.env.REACT_APP_API_ENDPOINT+item.image} alt=""/>
                                <div>
                                <h6 class="my-0">{item.name}</h6>
                                <small class="text-muted">{item.orderquantity}</small>
                                </div>
                               
                            </div>
                 
                            <span class="text-muted">{item.price *item.orderquantity} VND</span>
                        </li>
            
                       </>

                    )
                }) : "don't have any product"}


                <li class="list-group-item d-flex justify-content-between">
                    <span>Total (VND)</span>
                    <strong>{total}</strong>
                </li>
            </ul>

        </div>
    );
}

export default Cart;
