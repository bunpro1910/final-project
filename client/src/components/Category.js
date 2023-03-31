
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Product from './Product'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Hero from'./Hero'
function Idea() {
  let [showview, setshowview] = useState(false)
  let [showcomment, setshowcomment] = useState(false)

  let [product, setproduct] = useState({ cateid: '' })
  const socketRef = useRef();
  let getcategory = () => axios.get(`/category`).then((res) => res.data)
  const { isLoading, error, data, isFetching, refetch } = useQuery('category', getcategory, { staleTime: Infinity, cacheTime: Infinity })
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    socketRef.current = io.connect('http://localhost:3001')
    socketRef.current.on('newcategory', (args) => {
    })

  }, [product])

  if (isLoading) return (<>...loading</>)
  if (data.category.quantity == 0) {
    return <>don't have category</>
  }
  return (

    <><ul className='bg-white rounded-xl w-72'>
      <li className='mb-2 px-3 py-1 hover:bg-slate-200 rounded-xl' onClick={(e) => { setproduct({}) }}><button> ALL</button></li>
      {data.category.map((cate, i) => {
        return (
          <li className='mb-2 px-3 py-1 hover:bg-slate-200 rounded-xl' onClick={(e) => { setproduct({ cateid: cate.id }) }}><button>{cate.name}</button></li>
        )
      })}

    </ul>
 
    </>

    //   <>
    //   <nav class="navbar navbar-expand-lg navbar-dark mt-3 mb-5 shadow p-2" style={{backgroundColor:'#607D8B'}}>
    //   <div class="container-fluid">
    //     <a class="navbar-brand" href="#">Categories:</a>
    //     <button 
    //        class="navbar-toggler" 
    //        type="button" 
    //        >
    //       <i class="fas fa-bars"></i>
    //       show cate
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarSupportedContent2">
    //       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    //       <li class="nav-item acitve">
    //           <button class="nav-link text-white" onClick={(e)=>{setproduct({})}} href="#">All</button>
    //         </li>
    //         {data.category.map((cate,i)=>{
    //           return(
    //           <li class="nav-item">
    //             <button class="btn btn-category" onClick={(e)=>{setproduct({cateid:cate.id})}} href="#">{cate.name}</button>
    //           </li>
    //           )
    //         })}
    //       </ul>
    //       <form class="w-auto py-1" style={{maxWidth: 12+'rem'}}>
    //         <input type="search" onChange={(e)=>{setproduct({search:e.target.value})}} value = {product.search}class="form-control rounded-0" placeholder="Search" aria-label="Search"/>
    //       </form>   
    //     </div>
    //   </div>
    // </nav>
    // <Product id = {product}/>
    // </>

  );
}

export default Idea;
