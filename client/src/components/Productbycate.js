
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from '../models/getapi';
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Productcard from './Productcard'
import Filter from './Filter';
import Filterbrand from'./Filterbrand'
function Idea() {

    let params = useParams()
    const [filter,setFilter] = useState({
        s_brandid:""
    })
    console.log(filter)
    let getproduct = () => axios.get(`/product`,{params:{
        s_catename:params.name,
        s_brandid :filter.s_brandid
    }}).then((res) => res.data)
    const socketRef = useRef();

    const { isLoading, error, data, isFetching, refetch } = useQuery(['product', params.name,filter], getproduct, {})
    useEffect(() => {


    }, [data])

    if (isLoading) return (<>...loading</>)


    return (
        <>

            <div className="w-full flex flex-wrap justify-center mt-20 p-10">
                <div className="w-96 mb-4">
                    <p>filter</p>
                    <Filterbrand filter={filter} setFilter ={setFilter}  />
                </div>
                <div className="w-4/6 grid xl:grid-cols-4 gap-2 md:grid-cols-3  sm:grid-cols-2">
                    {data.quantity==0?<>don't have Product</>:data.product.map((item, i) => {
                        return <Productcard key={i} product={item}  />
                    })}
                </div>

            </div>

        </>

    );
}

export default Idea;
