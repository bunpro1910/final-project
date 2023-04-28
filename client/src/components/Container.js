
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Category from './Category'
import Hero from'./Hero'
function React() {
    useEffect(() => {

    }, [])
    return (
        <div className='mt-20 w-full justify-center flex'>
             <Hero/>
 
        </div>

          
    );
}

export default React;
