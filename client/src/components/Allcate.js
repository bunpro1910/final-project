import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useQuery, useQueries } from 'react-query';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Product from './Product';
import Productcard from './Productcard';
import Seachbar from './Searchbar'
import { getproductbycate } from '../Models/getdata';
function Idea() {
    
    const { isLoading, error, data, isFetching, refetch } = useQuery(['productbycate'], getproductbycate, {})
    useEffect(() => {
        // add any useEffect code here
    }, []);
    if (isLoading) return <>...loading</>
 
    return (
        <>
           
            <div className="w-full flex items-center flex-col mt-10">
                {data.quantity > 0 ? data.product.map((item, i) => {
                    return (<>
                        <div className="flex w-4/5 flex-col p-4 mt-4 bg-slate-700 rounded-md">
                            <div className="w-full flex border-b-2 pb-2 border-white text-white">
                                {item.catename}

                                <p className="mr-0 ml-auto"><Link to={`/search?name=${item.catename}`}>view all</Link></p>
                            </div>
                            <div className="w-full  mt-10 ">
                                <div className=" grid gap-4  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-b-2 pb-4 ">
                                    {item.product.map((item, i) => {
                                        return (
                                            <Productcard key={i} product={item} />
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </>

                    )
                }) : ""}
            </div>

        </>


    );
}

export default Idea;
