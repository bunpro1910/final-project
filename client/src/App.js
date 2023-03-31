
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import {useRef,useEffect}from 'react'
import Navbar from './components/Navbar';
import Login from './components/Login';

import {io} from 'socket.io-client'
import {useQuery}from 'react-query'
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
import Productdetail from'./components/Productdetail';
import Verify from'./components/Verify';
import Profile from'./components/User/Profile';
import 'react-notifications-component/dist/theme.css'
import Category from './components/Admin/Category';
import Categorybycate from './components/Productbycate';
import Brand from './components/Admin/Brand'
import Addbrand from'./components/Admin/Addbrand'
import {ToastContainer} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function App() {
  const socketRef = useRef();
  let getuser =()=> axios.get(`/api/authentication`,).then((res) => res.data)
  const { isLoading, error, data, isFetching,refetch  } = useQuery('authentication',getuser,{ staleTime: Infinity, cacheTime: Infinity })


  useEffect( ()=>{
    
    socketRef.current =io.connect(`${process.env.REACT_APP_API_ENDPOINT}`)
    socketRef.current.on('authentication',(args)=>{
      refetch()
    })
  },[])
  if(isLoading){return<></>}
  console.log(data)
  return (
  <div className="App">
   
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='productdetail/:id' element={<Productdetail />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />

          <Route path='history' element={<History />} />
          <Route path='profile' element={<Profile />} />
          <Route path='verify' element={<Verify />} />
          <Route path='category/:name' element={<Categorybycate />} />
        </Route>
      
        {data.user?data.user.roleid == 2? <Route path="/admin" element={<Navbar />}>
          <Route index element={<Adminindex />} />
          <Route path='brand' element={<Brand />} />
          <Route path='addcategory' element={<Addcategory />} />
          <Route path='addbrand' element={<Addbrand />} />
          <Route path='cartdetail/:id' element={<Cartdetail />} />
          <Route path='account' element={<Account />} />
          <Route path='category' element={<Category />} />
          <Route path='addproduct' element={<Addproduct />} />
          <Route path='product' element={<Product />} />
          <Route path='invoice' element={<Invoice />} />
        </Route>:"":""}
      </Routes>

    </BrowserRouter>
   
    
    </div>

  
  );
}

export default App;
