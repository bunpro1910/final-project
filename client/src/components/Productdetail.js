
import { Link, useLocation, useParams,useNavigate  } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { toast } from 'react-toastify'

function Idea() {
    let navigation = useNavigate()
    let params = useParams()
    let getproduct = () => axios.get(`/api/productdetail?id=${params.id}`).then((res) => res.data)
    const [product,setproduct ] =useState({id:"",quantity:1})
    const { isLoading, error, data, isFetching, refetch } = useQuery(['productdetail', params.id], getproduct, {})
    let addCart = async(e)=>{
        product.id = params.id
        setproduct({...product})
        let result = await axios.post(`/api/user/addcart`,{product:product})
        console.log(result.data.isSuccess)
        if(result.data.isSuccess) {
            navigation("/cart")
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message)
        }
        
    }

    useEffect(() => {

    }, [])
    if (isLoading) return (<>...loading</>)
    console.log(data)
    if (!params) {
        return (<>you need to navigate right way</>)
    }
    return (
        <>
            <div class="container mt-5">
                <div class="row">
                    

                    <div class="col-md-6 mb-4"style={{textAlign:"center"}}>
                        <img style ={{maxWidth:300+"px"}} src={process.env.REACT_APP_API_ENDPOINT+data.product[0].image} class="img-fluid" alt="" />
                    </div>
                    <div class="col-md-6 mb-4">

                        <div class="p-4">
                            <div class="mb-3">
                                <a href="">
                                    <span class="badge bg-dark me-1">{data.product[0].category_name}</span>
                                </a>
                                <a href="">
                                    <span class="badge bg-info me-1">New</span>
                                </a>
                                <a href="">
                                    <span class="badge bg-danger me-1">Bestseller</span>
                                </a>
                            </div>

                            <p class="lead">
                                <span class="me-1">
                           
                                </span>
                                <span>{data.product[0].price} VND</span>
                            </p>

                            <strong><p style={{fontSize:20+"px"}}>Description</p></strong>

                            <p>{data.product[0].description}</p>

                            <div class="d-flex justify-content-left">

                                <div class="form-outline me-1" style={{width:100+"px"}}>
                                    <input type="number" onChange={(e)=>{product.quantity= e.target.value; setproduct({...product})}} value={product.quantity} class="form-control" />
                                </div>
                                <button class="btn btn-primary ms-1" onClick = {addCart}>
                                    Add to cart
                                    <i class=""  >  <AiOutlineShoppingCart/></i>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>


                <hr />


                <div class="row d-flex justify-content-center">

                    <div class="col-md-6 text-center">
                        <h4 class="my-4 h4">Additional information</h4>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus suscipit modi sapiente illo soluta odit voluptates, quibusdam officia. Neque quibusdam quas a quis porro? Molestias illo neque eum in laborum.</p>
                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-4 col-md-12 mb-4">
                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg" class="img-fluid" alt="" />
                    </div>



                    <div class="col-lg-4 col-md-6 mb-4">
                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg" class="img-fluid" alt="" />
                    </div>



                    <div class="col-lg-4 col-md-6 mb-4">
                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg" class="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Idea;
