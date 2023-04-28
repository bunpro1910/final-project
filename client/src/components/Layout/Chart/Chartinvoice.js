
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import { useQuery, useQueries } from 'react-query'
import { TbBrandProducthunt } from 'react-icons/tb'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getdatainvoice } from '../../../Models/getdata'
ChartJS.register(ArcElement, Tooltip, Legend);
function Category({month,setmonth}) {
    
    const { isLoading, error, data, isFetching, refetch } = useQuery(['datainvoice', month], getdatainvoice(month))
    let navigate = useNavigate()
    useEffect(() => {


    }, [])

    if (isLoading) {
        return <>...loading</>
    }
    const datachart = {
        labels: [' Error', ' Success', ' Waiting'],
        datasets: [
            {
                label: 'Total',
                data: [data.data.totalerr, data.data.totalsuccess, data.data.totalwaiting],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',

                ],

                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Pie data={datachart} onClick={(e) => { navigate('./invoice') }} />
        </>
    );
}

export default Category;
