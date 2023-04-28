
import { Link, useLocation, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Backbutton from './Backbutton'
import numeral from 'numeral'
import SeachBar from './Searchbar'
import { getproductdetail } from '../Models/getdata'
function Idea() {
    let navigation = useNavigate()
    let params = useParams()
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    let id = searchParams.get('id')
    const [product, setproduct] = useState({ id: "", quantity: 1 })
    
    const { isLoading, error, data, isFetching, refetch } = useQuery(['productdetail', id], getproductdetail(id), {})
    let addCart = async (e) => {
        product.id = id
        setproduct({ ...product })
        let result = await axios.post('/api/user/addcart', { product: product })
        console.log(result)
        if (result.data.isSuccess) {
            toast.success(`Add Cart sucessfully`)
        } else {
            toast.error(result.data.message)
        }

    }

    useEffect(() => {

    }, [])
    if (isLoading) return (<>...loading</>)
    if (!params) {
        return (<>you need to navigate right way</>)
    }
    return (
        <>
            <SeachBar />
            <div class="container mt-5">
                {/* <div className='mb-10'>
                    <Link className='p-2 mx-2' to='/home'>Home</Link>
                    <Link className='p-2 mx-2' to={`/productdetail?id=${data.product[0].id}`}>{data.product[0].name}</Link>
                </div>
                <div className=' w-full flex justify-center '>
                    <div className='shadow rounded-2xl flex flex-wrap w-4/5 p-4'>
                        <div className='mx-10'>
                            <img src={data.product[0].image} className=' max-w-xs ' alt="" />
                        </div>
                        <div className='ml-5 '>
                            <Link to={'/search?name=' + data.product[0].category_name}>
                                <span class="badge bg-blue-600 me-1 p-2">{data.product[0].category_name}</span>
                            </Link>
                            <h1 className='text-2xl mt-3 font-semibold'>{data.product[0].name}</h1>
                            <h1 className='text-xl mt-3'>Brand</h1>
                            <h1 className='text-2xl mt-0 font-semibold'>Price</h1>
                        </div>
                    </div>

                </div> */}
                <div className='w-full flex justify-center '>
                    <div class=" shadow w-4/5 p-4 justify-center flex flex-wrap rounded-2xl !py-20">

                        <div class="col-md-6 mb-4 ">
                            <img style={{ maxWidth: 300 + "px" }} src={data.product[0].image} class="img-fluid mr-auto ml-auto" alt="" />
                        </div>
                        <div class="col-md-6 mb-4">

                            <div class="p-4">
                                <div class="mb-3">
                                    <Link to={'/search?name=' + data.product[0].category_name}>
                                        <span class="badge bg-blue-600 me-1">{data.product[0].category_name}</span>
                                    </Link>

                                </div>

                                <p class="uppercase text-2xl font-bold mb-2 ">

                                    <h1>{data.product[0].name}</h1>

                                </p>

                                <strong className=''><p style={{ fontSize: 20 + "px" }}>Brand Name</p></strong>

                                <p className='mb-4'>{data.product[0].brandname}</p>

                                <p className='mb-4'>{numeral(data.product[0].price).format('0,0')} <span> &#8363;</span></p>

                                <div class="d-flex justify-content-left">

                                    <div class="form-outline me-1" style={{ width: 100 + "px" }}>
                                        <input type="number" onChange={(e) => { product.quantity = e.target.value; setproduct({ ...product }) }} value={product.quantity} class="form-control" />
                                    </div>
                                    <button class="btn btn-primary ms-1 flex items-center" onClick={addCart}>
                                        Add to cart<i className="ml-2"  >  <AiOutlineShoppingCart /></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className="text-left flex flex-wrap mx-10 border-t-2 border-black w-full">
                            <div className='xl:w-1/2 md:w-1/2 sx:w-full xl:pr-20 md:pr-0 xs:pr-0'>
                                <h4 className="p-3 border-2 w-fit !border-t-0 border-black rounded-b-xl bg-green-500 transition-all duration-500 hover:bg-slate-700 hover:text-white">Detail</h4>
                                <div className='w-full mt-4'>
                                    <p className='flex justify-between ml-3 mt-2'><span>Name</span><span>{data.product[0].name}</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Price</span><span>{data.product[0].price}VND</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Category</span><span>{data.product[0].category_name}</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Brand</span><span>{data.product[0].brandname}</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Strap</span><span>{data.product[0].strap}</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Waterproof</span><span>{data.product[0].waterproof}</span></p>
                                </div>
                            </div>
                            <div class="xl:w-1/2 md:w-1/2 sx:w-full">
                                <h4 className="p-3 border-2 w-fit !border-t-0 border-black rounded-b-xl bg-blue-500 transition-all duration-500 hover:bg-slate-700 hover:text-white">Description</h4>

                                <p className="mt-4 text-xl font-semibold">{data.product[0].description}</p>
                            </div>

                        </div>
                    </div>
                </div>








            </div>
        </>

    );
}

export default Idea;
