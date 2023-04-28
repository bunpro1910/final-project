

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import Historydetail from './Historydetail'
import axios from 'axios'
import Backbutton from '../Backbutton'
import { gethistory } from '../../Models/getdata';
function Cart() {

    const { isLoading, error, data, isFetching, refetch } = useQuery(['history'], gethistory, {})
    const [showdetail, setshowdetail] = useState(false)
    const [cart, setcart] = useState(null)
    useEffect(() => {


    }, [data])
    const handleOpenDetail = (item) => (e) => {
        setcart(item)
        setshowdetail(true)
    }
    if (isLoading) return <>...loading</>
    return (
        <>
            <Historydetail showdetail={showdetail} setshowdetail={setshowdetail} cart={cart} />
            <div className="container">
                <Backbutton />
                <div className=' ml-40 mb-4'>
                    <Link className='bg-slate-600 rounded-xl p-2 hover:bg-slate-700 !text-white' to='/home'>back to home</Link>
                </div>
                <table class="table mt-4 w-4/5 mr-auto ml-auto">
                    <thead>
                        <tr>
                            <th scope="col">NO</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">Full Name</th>
    
                            <th scope="col">Your cart</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.totalhistory > 0 ? data.history.map((item, i) => {

                            return (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>#{item.id}</td>
                                    <td >{item.name}</td>
                                    <td ><Link type="" to={`/cartdetail/${item.cart_id}`} class="btn btn-primary">View Cart</Link></td>
                                    <td><button type="" class="btn btn-primary"onClick={handleOpenDetail(item)}>Detail</button></td>
                                    <td className={` rounded-md ${item.status == 1 ? "processing" : item.status == 2 ? "complete" : "error"}`}>{item.status == 1 ? "processing" : item.status == 2 ? "complete" : "error"}</td>
                                </tr>

                            )

                        }) : "don't have any history"


                        }
                    </tbody>


                </table>


            </div>
        </>
    );
}

export default Cart;
