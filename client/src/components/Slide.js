
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Category from './Category'
function React() {
    useEffect(() => {

    }, [])
    return (

        <>

            <section className='mt-12'>
              <img src="https://lh3.googleusercontent.com/nTgOe4Yv-J7OnWXA6rMGPTed_rGYY9QaBVneUF_E6f0Q4d9yUoc60D49y53JUIzkRyzcQ8V7rTpfK9G1Gx7AJOsvTkrSSjTD=w1920-rw" alt=""/>
              <div className="absolute top-36 left-32 text-black">
                <Category/>
              </div>
            </section>
        </>

    );
}

export default React;
