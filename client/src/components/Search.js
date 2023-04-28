
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import Filtercate from './Filtercate'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Productcard from './Productcard'
import Filterprice from './Filterprice'
import Filterbrand from './Filterbrand'
import SearchBar from './Searchbar'
function Idea() {

    const [searchParams, setSearchParams] = useSearchParams();
    const brandid = searchParams.get("brandid")
    const name = searchParams.get("name")
    const proname = searchParams.get("proname")
    const [price, setprice] = useState([0, 100])
    const [showfilterbrand, setshowfilterbrand] = useState(false)
    const [showfiltercate, setshowfiltercate] = useState(false)
    let getproduct = () => axios.get(`/api/product`, {
        params: {
            s_catename: name,
            s_brandid: brandid,
            s_name: proname,

        }
    }).then((res) => res.data)

    const { isLoading, error, data, isFetching, refetch } = useQuery(['product', searchParams], getproduct, {})
    useEffect(() => {
        refetch()
    }, [searchParams])

    if (isLoading) return (<>...loading</>)
    let max = 0
    if (data.quantity > 0) {
        max = data.product.reduce((init, item) => {
            if (init < item.price) return item.price
            else
                return init
        }, 0)
    }
    const percent = max / 100
    return (
        <>
            <SearchBar />
            <div className="w-full flex flex-wrap justify-center mt-20 p-10">
                <div className="w-96 mb-4 mr-5">
                    <p className='text-center text-xl bg-slate-400 text-white font-bold relative'><span className="fa fa-filter"></span> Filter <i className="fa fa-sync absolute top-1 right-1  hover:cursor-pointer hover:text-red-500" role='button' onClick={(e) => { searchParams.delete("name"); searchParams.delete("brandid");setprice([0,100]); setSearchParams({ ...searchParams }) }}></i></p>
                    <div className="">
                        <Filterprice searchParams={searchParams} setSearchParams={setSearchParams} price={price} setprice={setprice} percent={percent} />
                    </div>
                    <li className='bg-slate-400 p-2 list-none mt-2 text-left cursor-pointer  transition-all duration-500 hover:bg-slate-600 hover:text-white items-start'><button className='w-full text-left text-2xl justify-between flex' onClick={(e) => { setshowfilterbrand(!showfilterbrand) }}>Brand Filter<i className="fa fa-arrow-down  mr-6"></i></button></li>
                    <div className="">
                        <Filterbrand searchParams={searchParams} setSearchParams={setSearchParams} show={showfilterbrand} />
                    </div>
                    <li className='bg-slate-400 p-2 list-none mt-2  cursor-pointer  transition-all duration-500 hover:bg-slate-600 hover:text-white items-start'><button className='w-full text-left text-2xl justify-between flex' onClick={(e) => { setshowfiltercate(!showfiltercate) }}>Category Filter<i className="fa fa-arrow-down mr-6"></i></button></li>
                    <div className="">
                        <Filtercate searchParams={searchParams} setSearchParams={setSearchParams} show={showfiltercate} />
                    </div>




                </div>
                <div className="w-4/6 grid xl:grid-cols-4 gap-2 md:grid-cols-3 h-fit sm:grid-cols-2">
                    {data.quantity == 0 ? <>don't have Product</> : data.product.map((item, i) => {
                        if (item.price >= (price[0] * percent) && item.price <= (price[1] * percent)) {
                            return <Productcard key={i} product={item} percent={percent} />
                        }

                    })}
                </div>

            </div>

        </>

    );
}

export default Idea;
