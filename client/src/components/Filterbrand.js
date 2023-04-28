
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
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
import Productcard from './Productcard'
import { getbrand } from '../Models/getdata'
function Idea({searchParams,setSearchParams,show}) {

    const { isLoading, error, data, isFetching, refetch } = useQuery('brand', getbrand, { staleTime: Infinity, cacheTime: Infinity })
    let branid = searchParams.get("brandid")

    
    if(isLoading){return<>...loading</>}
  
    return (
        <>
            <div className={`w-full  ${show?"block":"hidden"}`}>
                <ul className=" bg-slate-200 rounded-md">
           
                    {data.brand.map((item,i)=>{
                        return <li className={` hover:bg-slate-400 p-2 rounded-xl ${branid==item.id?"!bg-slate-400":""}`} key={i}><button onClick={(e)=>{searchParams.set("brandid",item.id);setSearchParams(searchParams)}}>{item.name}</button></li>
                    })}
                     <li className='hover:bg-slate-400 p-2 rounded-xl'><button  onClick={(e)=>{searchParams.delete("brandid");setSearchParams(searchParams)}}>All Brand</button></li>
                </ul>
            </div>

        </>
    );
}

export default Idea;
