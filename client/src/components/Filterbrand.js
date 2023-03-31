
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
function Idea({filter,setFilter}) {
  
    


    let getcategory = () => axios.get(`/brand`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery('brand', getcategory, { staleTime: Infinity, cacheTime: Infinity })
    if(isLoading){return<>...loading</>}
    return (
        <>
            <div className="w-full ">
                <ul className=" bg-slate-200 mr-4 p-2 rounded-md">
                    {data.brand.map((item,i)=>{
                        return <li key={i}><button onClick={(e)=>{filter.s_brandid = item.id;setFilter({...filter})}}>{item.name}</button></li>
                    })}

                </ul>
            </div>

        </>
    );
}

export default Idea;
