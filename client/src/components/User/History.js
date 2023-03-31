

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import Historydetail from './Historydetail'
import axios from 'axios'
function Cart() {
    let gethistory = () => axios.get(`/user/history`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['history'], gethistory, {})
    const [showdetail,setshowdetail] = useState(false)
    const[cart,setcart] = useState(null)
    useEffect(() => {


    }, [data])
    const handleOpenDetail = (item)=>(e)=>{
        setcart(item)
        setshowdetail(true)
    }
    if (isLoading) return <>...loading</>
    return (
        <>
        <Historydetail showdetail ={showdetail}  setshowdetail ={setshowdetail} cart={cart}/>

        <div className="container">
            <Link to='/home'>back to home</Link>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Full Name</th>
                       
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.totalhistory > 0 ? data.history.map((item, i) => {
                 
                        return (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>#{item.id}</td>
                                <td>{item.name}</td>
                                <td><button type="" onClick={handleOpenDetail(item)}>Detail</button></td>
                                <td className = {item.status==1?"processing":item.status ==2?"complete":"error"}>{item.status==1?"processing":item.status ==2?"complete":"error"}</td>
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
