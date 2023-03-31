
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from '../../models/getapi';
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { TbBrandProducthunt } from 'react-icons/tb'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import Product from './Product'
import { ReactNotifications, Store } from 'react-notifications-component'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
function Category() {
  const totalmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let [month,setmonth] = useState(new Date().getMonth())
  let getproduct = () => axios.get(`/admin/datainvoice?month=${month}`).then((res) => res.data)
  const { isLoading, error, data, isFetching, refetch } = useQuery(['datainvoice',month], getproduct)

  let navigate= useNavigate()
  useEffect(() => {


  }, [])

  if (isLoading) {
    return <>...loading</>
  }
  console.log(data)
  const datachart = {
    labels: [' Error', ' Success', ' Waiting'],
    datasets: [
      {
        label: 'Total',
        data: [data.data?.totalerr, data.data?.totalsuccess, data.data?.totalwaiting],
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
      <div className="row mt-10 flex flex-wrap">
        <div className="left-navbar ml-4">
          <ul className="p-2">
            <li>
              <Link to='product'> <i><TbBrandProducthunt /></i> Manager Product</Link>
            </li>
            <li>
              <Link to='category'> <i><BiCategoryAlt /></i> Manager Category</Link>
            </li>
            <li>
              <Link to='invoice'> <i><FaFileInvoiceDollar /></i> Manager Invoice</Link>
            </li>
            <li>
              <Link to='brand'> <i><FaFileInvoiceDollar /></i> Manager Brand</Link>
            </li>
            <li>
              <Link to='account'> <i><MdManageAccounts /></i> Manager Account</Link>
            </li>
            <li>
              1
            </li>
            <li>
              1
            </li>
            <li>
              1
            </li>

          </ul>
        </div>
        <div className='content'>
          <div className='item'>
            <select value={month} onChange={(e)=>{setmonth(e.target.value)}}> 
              <option value="" defaultValue >select month</option>
              {totalmonth.map((item,i)=>{
                return <option value={i}>{item}</option>
              })}
            </select>
            
            <br/>
            {data.data.totalerr !=0 && data.data.totalsuccess && data.data.totalwaiting? <Pie data={datachart}  onClick={(e)=>{navigate('./invoice')}} />:'dont have any invoice'}
          </div>
          <div className='item'>

          </div>
          <div className='item'>

          </div>
          <div className='item'>

          </div>
        </div>
      </div>

    </>
  );
}

export default Category;
