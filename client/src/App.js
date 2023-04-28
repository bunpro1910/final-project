
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useRef, useEffect } from 'react'
import Navbar from './components/Navbar';
import Login from './components/Login';
import axios from 'axios';
import { io } from 'socket.io-client'
import { useQuery } from 'react-query'
import Home from './components/Home';
import Account from './components/Admin/Account';
import History from './components/User/History';
import Cartdetail from './components/Admin/Cartdetail';
import Addcategory from './components/Admin/Addcategory';
import Addproduct from './components/Admin/Addproduct';
import Product from './components/Admin/Product';
import Cart from './components/User/Cart';
import Invoice from './components/Admin/Invoice';
import Adminindex from './components/Admin/Adminindex';
import Checkout from './components/User/Checkout';
import Register from './components/Register';
import Productdetail from './components/Productdetail';
import Verify from './components/Verify';
import Profile from './components/User/Profile';
import 'react-notifications-component/dist/theme.css'
import Category from './components/Admin/Category';
import Categorybycate from './components/Search';
import Brand from './components/Admin/Brand'
import Addbrand from './components/Admin/Addbrand'
import Addrole from './components/Admin/Addrole'
import Role from './components/Admin/Role'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import UserNav from './components/Layout/Navbar/UserNav'
import AdminNav from './components/Layout/Navbar/AdminNav'
import socket from './Models/socket';
import Adduser from './components/Admin/Adduser'
import Cartdetailpage from './components/User/Cartdetailpage'
function App() {

  let getuser = () => axios.get("/api/authentication").then((res) => res.data)
  const { isLoading, error, data, isFetching, refetch } = useQuery('authentication', getuser, { staleTime: Infinity, cacheTime: Infinity })


  useEffect(() => {
    socket.on('authentication', (args) => {
      refetch()
    })
  }, [])
  if (isLoading) { return <></> }

  return (
    <div className="App">

      <ToastContainer autoClose={1500} theme='dark' transition={Flip} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminNav user={data} />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='home' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='productdetail' element={<Productdetail />} />
            {data.user ? data.user.isUser ? <>
              <Route path='checkout' element={<Checkout />} />
              <Route path='history' element={<History />} />
              <Route path='profile' element={<Profile />} /></> : "" : ""}
              <Route path='cartdetail/:id' element={<Cartdetailpage />} />
            <Route path='verify' element={<Verify />} />
            <Route path='search' element={<Categorybycate />} />
          </Route>

          {data.user ? data.user.isManager ?
            <Route path="/admin" element={<AdminNav user={data} />}>
              <Route index element={<Adminindex />} />
              <Route path='brand' element={<Brand />} />
              <Route path='addcategory' element={<Addcategory />} />
              <Route path='addrole' element={<Addrole />} />
              <Route path='addbrand' element={<Addbrand />} />
              <Route path='cartdetail/:id' element={<Cartdetail />} />
              <Route path='category' element={<Category />} />
              <Route path='addproduct' element={<Addproduct />} />
              <Route path='product' element={<Product />} />
              <Route path='invoice' element={<Invoice />} />
              {data.user.isAdmin ? 
              <>
                <Route path='adduser' element={<Adduser />} />
                <Route path='account' element={<Account />} />
                <Route path='role' element={<Role />} />
              </> : ""}

            </Route> : "" : ""}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
