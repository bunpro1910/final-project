import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useQuery, useQueries } from 'react-query';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Product from './Product';


function Idea({product}) {
    let navigate =useNavigate()
    const navigateProductdetail =(proid)=>(e)=>{
        navigate(`/api/productdetail/${proid}`)
    }
    useEffect(() => {
        // add any useEffect code here
    }, []);
    
    return (
        <>
            <div className="bg-slate-300 p-3 text-md rounded-md cursor-pointer " onClick={navigateProductdetail(product.id)}>
                <img className="rounded-md hover:scale-105 ease-in-out duration-500" src={process.env.REACT_APP_API_ENDPOINT+product.image} alt="" />
                <h1 className='mt-10'>{product.catename}</h1>
                <h1 className=''>{product.name}</h1>
                <h1 className='text-blue-500 mt-4'>{product.price}</h1>
            </div>
        </>


    );
}

export default Idea;
