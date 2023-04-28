
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import { useQuery, useQueries } from 'react-query'
import { TbBrandProducthunt } from 'react-icons/tb'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { getbestsaler, getdatainvoice } from '../../../Models/getdata'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
function Category() {

    const { isLoading, error, data, isFetching, refetch } = useQuery(['bestsaler'], getbestsaler)
    let navigate = useNavigate()
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    useEffect(() => {


    }, [])

    if (isLoading) {
        return <>...loading</>
    }


    return (
        <>
        {data.quantity>0 && 
            <Bar data= {{
                labels:  data.data.map((item)=>item.name.substr(0,12)+"..."),
                datasets: [
                  {
                    label: 'Quantity',
                    data: data.data.map((item)=>item.sum),
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                  },
                ],
              }}onClick={(e) => { navigate('./product') }} />
        }
        {data.quantity==0 &&<>"don't have any product"</>}

        </>
    );
}

export default Category;
