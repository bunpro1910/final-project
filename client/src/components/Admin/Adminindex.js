
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import { useQuery, useQueries } from 'react-query'
import { TbBrandProducthunt } from 'react-icons/tb'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import Chatbestsalerpro from'../Layout/Chart/Chartbestsalerpro'
import Chartinvoice from '../Layout/Chart/Chartinvoice'
import { gettotalinvoice, gettotaluser } from '../../Models/getdata'
import Chatbymonth from '../Layout/Chart/Chatbymonth'
function Category() {
  const totalmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let [month, setmonth] = useState(new Date().getMonth())
  const { isLoading, error, data, isFetching, refetch } = useQuery(['invoicetotal'], gettotalinvoice)
  const { isLoading :isloadinguser, error: erroruser, data: datauser, isFetching :isFetchinguser, refetch :refetchuser } = useQuery(['totaluser'], gettotaluser)
  useEffect(() => {


  }, [])

  if(isLoading){
    return <></>
  }

  if(isloadinguser){
    return <></>
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <nav >
          <div className="bg-gray-800 shadow-xl fixed bottom-0  md:relative md:h-full z-10 w-full md:w-48 content-center">

            <div className="md:mt-0 md:fixed  md:w-48  md:left-0 md:top-20 content-center md:content-start text-left justify-between">
              <ul className="list-reset flex flex-row md:!flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                <li className="mr-3 flex-1 my-1">
                  <Link to="product" className=" flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className=" ml-2 mr-2 !p-0 fa fa-tasks "></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Manager Product</span>
                  </Link>
                </li>
                <li className="mr-3 flex-1 my-1">
                  <Link to="brand" className=" flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className=" ml-2 mr-2 !p-0 fa fa-tasks "></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Manager Brand</span>
                  </Link>
                </li>
                <li className="mr-3 flex-1 my-1">
                  <Link to="role" className=" flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className=" ml-2 mr-2 !p-0 fa fa-tasks "></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Manager Role</span>
                  </Link>
                </li>
                <li className="mr-3 flex-1 my-1">
                  <Link to="category" className=" flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className=" ml-2 mr-2 !p-0 fa fa-tasks "></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Manager Category</span>
                  </Link>
                </li>
                <li className="mr-3 flex-1 my-1">
                  <Link to="account" className=" flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className=" ml-2 mr-2 !p-0 fa fa-user "></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Manager User</span>
                  </Link>
                </li>
                <li className="mr-3 flex-1 my-1">
                  <Link to="invoice" className=" flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className=" ml-2 mr-2 !p-0 fa fa-tasks "></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Manager Invoice</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <section>
          <div id="main" className="main-content flex-1 bg-gray-100 md:mt-0 pb-24 md:pb-5">

            <div className="bg-gray-800 pt-3">
              <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                <h1 className="font-bold pl-2">Analytics</h1>
              </div>
            </div>

            <div className="flex flex-wrap" role="button">
              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                      <h2 className="font-bold uppercase text-gray-600">Total Invoice Success</h2>
                      <p className="font-bold text-3xl">{data.data.totalsuccess }<span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className="rounded-full p-5 bg-yellow-400"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                      <h2 className="font-bold uppercase text-yellow-600">Total Invoice Processing</h2>
                      <p className="font-bold text-3xl">{data.data.totalwaiting } <span className="text-yellow-500"><i className="fas fa-caret-up"></i></span></p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-600 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className="rounded-full p-5 bg-red-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                      <h2 className="font-bold uppercase text-gray-600">Total Invoice Error</h2>
                      <p className="font-bold text-3xl">{data.data.totalerr } <span className="text-red-600"><i className="fas fa-caret-up"></i></span></p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className="rounded-full p-5 bg-blue-600"><i className="fas fa-user fa-2x fa-inverse"></i></div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                      <h2 className="font-bold uppercase text-gray-600">Total user</h2>
                      <p className="font-bold text-3xl">{datauser.quantity}</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                      <div className="rounded-full p-5 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-inverse"></i></div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                      <h2 className="font-bold uppercase text-gray-600">Total Revenues</h2>
                      <p className="font-bold text-3xl">{data.data.total} VND</p>
                    </div>
                  </div>
                </div>

              </div>
           
            </div>


            <div className="flex flex-row flex-wrap flex-grow mt-2">

              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-white border-transparent rounded-lg shadow-xl">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                    <h className="font-bold uppercase text-gray-600">Invoice Total</h>
                  </div>
                  <select className="border-2 border-black w-full" value={month} onChange={(e) => { setmonth(e.target.value) }}>
                    <option value="" defaultValue >select month</option>
                    {totalmonth.map((item, i) => {
                      return <option value={i}>{item}</option>
                    })}
                  </select>
                  <div className="p-3">
                    <Chartinvoice month={month} setmonth={setmonth} />
                  </div>
                </div>

              </div>

              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-white border-transparent rounded-lg shadow-xl">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                    <h2 className="font-bold uppercase text-gray-600">Best saler Product</h2>
                  </div>
                  <div className="p-1">
                   <Chatbestsalerpro/>
                  </div>
                </div>

              </div>

              <div className="w-full md:w-1/2 xl:w-1/3 p-6">

                <div className="bg-white border-transparent rounded-lg shadow-xl">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                    <h2 className="font-bold uppercase text-gray-600">Totoal Order Per month</h2>
                  </div>
                  <div className="p-0">
                    <Chatbymonth/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>


      {/* <div classNameName="row mt-10 flex flex-wrap">
        <div classNameName="left-navbar ml-4">
          <ul classNameName="p-2">
            <li>
              <Link to='product'> <i classNameName=""><TbBrandProducthunt /></i> Manager Product</Link>
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
        <div classNameName='content'>
          <div classNameName='item'>
            <select value={month} onChange={(e)=>{setmonth(e.target.value)}}> 
              <option value="" defaultValue >select month</option>
              {totalmonth.map((item,i)=>{
                return <option value={i}>{item}</option>
              })}
            </select>
            
            <br/>
            <Pie data={datachart}  onClick={(e)=>{navigate('./invoice')}} />
          </div>
          <div classNameName='item'>

          </div>
          <div classNameName='item'>

          </div>
          <div classNameName='item'>

          </div>
        </div>
      </div> */}

    </>
  );
}

export default Category;
