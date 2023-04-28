
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
import socket from '../Models/socket'

function Idea( {id} ) {

    let navigate =useNavigate()
    let getproduct = () => axios.get(`/product?${id.cateid?`cateid=`+id.cateid:""}${id.search?`&search=`+id.search:""}`).then((res) => res.data)
    const socketRef = useRef();
    const { isLoading, error, data, isFetching, refetch } = useQuery(['product', id.cateid,id.search], getproduct, {})
    const [product,setproduct ] =useState({id:"",quantity:1})
    let addCart = (productid)=> async(e)=>{
        product.id = productid
        setproduct({...product})
        let result = await axios.post('/user/addcart',{product:product})
        
        if(result.data.isSuccess) {
            navigate("/cart")
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message)
        }
        
    }
    useEffect(() => {
       
        socket.on('reloadproduct', (args) => {
            refetch()
        })

    }, [data])

    if (isLoading) return (<>...loading</>)

    if (data.quantity == 0) {
        return <>don't have Product</>
    }
    return (
        <>
            <div className="container" >
                <div class="row">
                    {data.product.map((pro, i) => {
                        return (
                            <div class="card" style={{ width: 18 + "rem", margin: 18 + 'px' }} onClick={(e)=>{navigate(`/productdetail/${pro.id}`,{state:{id:pro.id}})}}>
                                <img src={pro.image} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{pro.name}</h5>
                                    <p class="card-text">{pro.description}</p>
                                    <button class="btn btn-primary" onClick={addCart(pro.id)}>Add cart</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>

    );
}

export default Idea;
