
import { Link, useLocation } from 'react-router-dom'
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
let sildelist = [{
    id: 1,
    classname: "bg-image"
}, {
    id: 2,
    classname: "bg-image-1",
}, {
    id: 3,
    classname: "bg-image-2",
}, {
    id: 4,
    classname: "bg-image-3"

}]




function Idea() {
    const [slide, setslide] = useState(1)
    useEffect(() => {

    })
    return (
        <div className={' w-8/12 border-2 shadow-xl ' + (sildelist.filter((e) => e.id == slide)[0].classname)}  >
            <div className='flex justify-around text-xl'>
                <button className={'p-4 width-1 rounded-t-lg  ' + (slide == 1 ? "!bg-transparent border-b-2 border-black" : "bg-white")} onClick={(e) => { setslide(1) }} type="" >123</button>
                <button className={'p-4 width-1 rounded-t-lg  ' + (slide == 2 ? "!bg-transparent border-b-2 border-black" : "bg-white")} onClick={(e) => { setslide(2) }} type="" >123</button>
                <button className={'p-4 width-1  rounded-t-lg ' + (slide == 3 ? "!bg-transparent border-b-2 border-black" : "bg-white")} onClick={(e) => { setslide(3) }} type="" >123</button>
                <button className={'p-4 width-1  rounded-t-lg ' + (slide == 4 ? "!bg-transparent border-b-2 border-black" : "bg-white")} onClick={(e) => { setslide(4) }} type="" >123</button>

            </div>
            <button type="" className='opacity-75 text-white flex ml-auto mr-2 mt-2 my-4 p-2 hover:opacity-100'>view all</button>
            <div className='w-full flex flex-wrap'>


                {slide == 1 ? <>

                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://cdn.tgdd.vn/Products/Images/42/289694/iphone-14-pro-tim-thumb-600x600.jpg" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>
                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://cdn.tgdd.vn/Products/Images/42/289694/iphone-14-pro-tim-thumb-600x600.jpg" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>
                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://cdn.tgdd.vn/Products/Images/42/289694/iphone-14-pro-tim-thumb-600x600.jpg" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>
                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://cdn.tgdd.vn/Products/Images/42/289694/iphone-14-pro-tim-thumb-600x600.jpg" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>

                </> : ""}
                {slide == 2 ? <>

                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTgcY8Ucpv2b7fdAgGgvwSO-NyeSepjmzinZP40gaCH_l4_PB4Q15IaWkK2tc3mTUQqga_p0R93ZQ&usqp=CAc" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>
                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTgcY8Ucpv2b7fdAgGgvwSO-NyeSepjmzinZP40gaCH_l4_PB4Q15IaWkK2tc3mTUQqga_p0R93ZQ&usqp=CAc" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>
                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTgcY8Ucpv2b7fdAgGgvwSO-NyeSepjmzinZP40gaCH_l4_PB4Q15IaWkK2tc3mTUQqga_p0R93ZQ&usqp=CAc" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>
                    <div className="my-10 mx-auto w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="card-product bg-slate-100 p-2 rounded-md pb-4">
                            <img className="opacity-75 hover:opacity-100 hover:p-2 w-full" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTgcY8Ucpv2b7fdAgGgvwSO-NyeSepjmzinZP40gaCH_l4_PB4Q15IaWkK2tc3mTUQqga_p0R93ZQ&usqp=CAc" alt="" />
                            <h1 className="text-black text-center mt-2">Title</h1>
                            <h2 className="text-black text-center">Name</h2>
                            <p className="mt-4 text-blue-400 pl-4">Price</p>
                        </div>
                    </div>

                </> : ""}
            </div>
        </div>
    );
}

export default Idea;
