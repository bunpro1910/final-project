
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Product from './Product'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Hero from'./Hero'
function Idea() {
    const location = useLocation()
    const navigate =useNavigate()
    const routes = location.pathname.split('/').filter(element => element);
    let string= ''
    const navigateroute = routes.reduce((init,item,i)=>{
        string+=`/${item}`
        console.log(string,i)
        init.push(string)
        return init
    },[])
    return<>
    <div className=" p-3 w-fit ml-44 ">
        <button className=" p-2 mx-2" type="" onClick={(e)=>{navigate('/home')}}>Home </button>/
        {routes.map((item,i)=>{
            return <><button  className="p-2 mx-2"type="" onClick={(e)=>{navigate(navigateroute[i])}}>{item}</button>/</>
        })}
    </div></>
 
}

export default Idea;
