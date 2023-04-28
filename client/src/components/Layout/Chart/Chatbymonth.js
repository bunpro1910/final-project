
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import { useQuery, useQueries } from 'react-query'
import { TbBrandProducthunt } from 'react-icons/tb'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'


import { getdatainvoice, getdatainvoicebymonth } from '../../../Models/getdata'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function Category({ month, setmonth }) {

    const { isLoading, error, data, isFetching, refetch } = useQuery(['datainvoicebymonth'], getdatainvoicebymonth)
    let navigate = useNavigate()
    useEffect(() => {


    }, [])

    if (isLoading) {
        return <>...loading</>
    }


    return (
        <>
            {data.quantity>0&&<Line data={{
                labels: data.data.map((item)=>item.label),
                datasets: [
                    {
                        label: 'Sales',
                        data: data.data.map((item)=>item.value),
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        lineTension: 0.1
                    }
                ]
            }} onClick={(e) => { navigate('./invoice') }} />}
        </>
    );
}

export default Category;
