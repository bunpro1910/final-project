

import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useReducer, Redirect } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { useQuery, useQueries } from 'react-query'
import Cartdetail from './Cartdetail'
import axios from '../../models/getapi';
import { toast } from 'react-toastify';
function Cart() {
    let navigate = useNavigate()
    let getdata = () => axios.get(`https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['data'], getdata, {})
    let [user, setuser] = useState(JSON.parse(localStorage.getItem('user')))
    let [city, setcity] = useState('')
    const [product, setProduct] = useState(null)
    let [district, setdistrict] = useState('')
    let [address, setaddress] = useState('')
    let [ward, setward] = useState('')
    const handleClick = async () => {
        try {
            //accounttest paypal
            //username sb-9g7hi25402313@personal.example.com
            //pass n0H1}N-1
            const response = await axios.post(`/user/payal`, { product: product, amount: 0, description: "pay for nothing" });

            window.location.replace(response.data.link)

        } catch (error) {
            console.error(error);
        }
    };
    let handlesubmit = async (e) => {
        e.preventDefault();
        let result = await axios.post(`/user/checkout`, { fullname: user.fullname, email: user.gmail, date: new Date(), phone_number: user.phone_number, address: address + ", " + ward + ", " + district + ", " + city })
        if (result.data.isSuccess) {
            toast.success(result.data.message)
            navigate('/history')
        } else {
            toast.error(result.data.message)
        }
    }
    useEffect(() => {


    }, [])
    if (isLoading) return <>...loading</>


    return (
        <>
            <div class="container">
                <div class="py-5 text-center">
                    <h2>Checkout form</h2>
                    <p class="lead"></p>
                </div>
                <div class="row">
                    <Cartdetail product={product} setProduct={setProduct} />
                    <form class="needs-validation form-billing" onSubmit={handlesubmit}>
                        <h4 class="mb-3">Billing address</h4>
                        <div class="row">
                            <div class="mb-3">
                                <label for="firstName">Full Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="" onChange={(e) => { user.fullname = e.target.value; setuser({ ...user }) }} value={user.fullname} required />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="username">Username</label>
                            <div class="input-group">
                                <input type="text" readOnly class="form-control" id="username" placeholder="Username" required value={user.account_id} />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="email">Email <span class="text-muted"></span></label>
                            <input type="email" class="form-control" onChange={(e) => { user.gmail = e.target.value; setuser({ ...user }) }} value={user.gmail} placeholder="you@example.com" />
                        </div>
                        <div class="mb-3">
                            <label for="email">Phone Number <span class="text-muted"></span></label>
                            <input type="text" class="form-control" value={user.phone_number} onChange={(e) => { user.phone_number = e.target.value; setuser({ ...user }) }} placeholder="" />
                        </div>
                        <div class="mb-3">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" placeholder="1234 Main St" value={address} onChange={(e) => { setaddress(e.target.value) }} required />
                        </div>


                        <div class="row">
                            <div class="col-md-5 mb-3">
                                <label for="country">City</label>
                                <select class="form-control" id="country" onChange={(e) => { setcity(e.target.value); setdistrict(''); setward('') }} required>
                                    <option value="" >Choose...</option>
                                    {data.map((item, i) => {
                                        return (<option value={item.Name}>{item.Name}</option>)
                                    })}
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="state">District</label>
                                <select class="form-control" id="state" onChange={(e) => { setdistrict(e.target.value); setward('') }} required value={district}>
                                    <option value="">Choose...</option>
                                    {city != '' ? data.filter(item => item.Name == city)[0].Districts.map((dis, i) => {
                                        return (
                                            <option value={dis.Name}>{dis.Name}</option>
                                        )
                                    }) : ""}
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="state">Ward</label>
                                <select class="form-control" id="state" onChange={(e) => { setward(e.target.value) }} required value={ward}>
                                    <option value="">Choose...</option>
                                    {city != '' && district != "" ? data.filter(item => item.Name == city)[0].Districts.filter(item => item.Name == district)[0].Wards.map((ward, i) => {
                                        return (
                                            <option value={ward.Name}>{ward.Name}</option>
                                        )
                                    }) : ""}
                                </select>
                            </div>
                        </div>

                        <hr class="mb-4" />

                        <button class="btn btn-primary bg-blue-600 h-10 hover:bg-blue-700" type="submit">Continue to checkout</button>
                        <button type="button" onClick={handleClick} class="ml-4 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                            Check out with PayPal
                        </button>

                    </form>
                </div>



            </div>
        </>

    );
}

export default Cart;
