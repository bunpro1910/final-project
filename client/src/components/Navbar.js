import { FaHome, FaEye, FaUpload, FaFolder } from "react-icons/fa";
import { useRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import axios from 'axios'
import Footer from './Footer';
import { ReactNotifications, Store } from 'react-notifications-component'
import { io } from 'socket.io-client'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import Cart from './User/Cart'
function Navbar({ user }) {
  let navigate = useNavigate()
  console.log(navigate)
  const [navbar, setNavbar] = useState(false);
  const [showcart, setshowcart] = useState(false);
  const logout = async (e) => {
    let result = await axios.get('/api/logout')
    toast.success('Log out successfully')
    window.location.href = '/'
  }
  const socketRef = useRef();

  useEffect(() => {

  }, [])


  return (
    <>
      {showcart ? <Cart showcart={showcart} setshowcart={setshowcart} /> : ""}
      <nav className="w-full bg-slate-800 shadow text-white">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 pt-2">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="javascript:void(0)">
                <h2 className="text-2xl font-bold uppercase">Pham Le Hai Son</h2>
              </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:!text-rose-600">
                  <Link className="hover:!text-rose-600" to="/home">Home</Link>
                </li>


                {user.user ? user.user.isUser ? <>
                  <li className="text-white hover:!text-rose-600">
                    <Link className="hover:!text-rose-600" to="/history">History</Link>
                  </li>
                  <li className="text-white hover:!text-rose-600">
                    <button role="button" onClick={(e) => { setshowcart(true) }}>Cart</button>
                  </li>
                </> : "" : ""}
                {user.user ? user.user.isAdmin ? <>
                  <li className="text-white hover:!text-rose-600">
                  <Link className="hover:!text-rose-600" to="/admin">Dashboard</Link>
                </li>
                </> : "" : ""}

                {user.user != 'not found' ? <><li className="nav-item">
                  {localStorage.setItem('user', JSON.stringify(user.user))}
                  <Link className="hover:!text-rose-600" to='/profile'>{user.user.fullname} </Link></li>
                  <li className="text-white hover:!text-rose-600"><Link onClick={logout} className='btn-logout'>logout</Link></li></>
                  : <>
                    <li className="text-white hover:!text-rose-600"><Link className="hover:!text-rose-600" to='/login' >Login </Link></li>
                    <li className="text-white hover:!text-rose-600"><Link className="hover:!text-rose-600" to='/register' >Register </Link></li>
                  </>

                }
              </ul>
            </div>
          </div>
        </div>
      </nav>


    </>
  );
}

export default Navbar;
