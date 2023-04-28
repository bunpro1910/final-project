import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useQuery, useQueries } from 'react-query';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Product from './Product';
import numeral from 'numeral';

function Idea({product}) {
    let navigate =useNavigate()
    const navigateProductdetail =(proid)=>(e)=>{
        navigate(`/productdetail?id=${proid}`)
    }
    useEffect(() => {
        // add any useEffect code here
    }, []);
    
    return (
        <>
            <div className="bg-slate-300 p-3 text-md rounded-md cursor-pointer " onClick={navigateProductdetail(product.id)}>
                <img className="rounded-md hover:scale-105 ease-in-out duration-500" src={product.image} alt="" />
                <h1 className='mt-10'>{product.catename}</h1>
                <h1 className=''>{product.name}</h1>
                <h1 className='text-blue-500 mt-4 numeral'>{ numeral(product.price).format('0,0')}<span> &#8363;</span></h1>
            </div>
        </>


    );
}

export default Idea;
