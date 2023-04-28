
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
import { getbrand, getcategory } from '../Models/getdata'
import Slider from '@mui/material/Slider';
function Idea({ searchParams, setSearchParams,price,setprice,percent }) {

    const handleChange = (event, newValue) => {
        searchParams.set("price", {bigger:price[0],less:price[1]})
        setprice(newValue);
      };

    function valuetext(value) {
        return `${value} VND`;
      }

    return (
        <>
            <div className={`w-full transition-all duration-500`}>
                <ul className=" bg-slate-200 rounded-md p-4">
                    <label for="customRange1" class="form-label">Price of product</label>
                    <label for="customRange1" class="form-label w-full text-center">{price[0]*percent} - {price[1]*percent} <span>&#8363;</span></label>
                   <div className="w-[90%] mr-auto ml-auto">
                   <Slider
                        value={price}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}

                    />
                   </div>
                </ul>
            </div>

        </>
    );
}

export default Idea;
