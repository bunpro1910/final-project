import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef,Fragment } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Category from './Category'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { BsFillMicFill } from 'react-icons/bs';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function Idea() {

    const [isFixed, setIsFixed] = useState(false)
    const [search, setSearch] = useState('')
    let navigate = useNavigate()


 
    let getproduct = () => axios.get(`/api/autocomplete`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['autocomplete'], getproduct, {})
    const handleChange = (event, value) => {
        switch (value.type) {
            case "product":
                navigate('/productdetail/?id=' + value.id)
                break;
            case "category":
                navigate('/search?name=' + value.name)
                break;
            case "brand":
                navigate('/search?brandid=' + value.id)
                break;
            default:
                break;
        }
    }
    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/search?proname=' + search)
    }


    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 150) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])
    
    return (
        <>
            <div className={`w-full mt-4 items-center  bg-white flex flex-wrap p-2 ${isFixed ? 'fixed top-0 z-50 !mt-0 shadow' : ''}`}>

                <div className={`ml-20 transition-all duration-1000 ${isFixed ? "w-16 slidein h-10" : " w-72 slideout h-10"}`}>
                    
                    <div className='text-3xl font-bold uppercase'>
                    {!isFixed ? "Pham le Hai Son":"Son"}
                    </div>
                </div>

                {<div className='ml-4 border-solid border-slate-300 border-2  rounded-md hover:bg-slate-100'>
                    <PopupState variant="popover" >
                        {(popupState) => (
                            <Fragment>
                                <button className="px-4 py-2" variant="contained" {...bindTrigger(popupState)}>
                                    Category List
                                </button>
                                <Category bindMenu={bindMenu} popupState={popupState}/>
                            </Fragment>
                        )}
                    </PopupState>
                    {/* <button onClick={(e) => { setShowcate(!showcate) }} type="" className='flex items-center '><AiOutlineMenu className="mr-4" /> Category List</button>
                    {showcate ? <Category setShowcate={setShowcate} /> : ""} */}
                </div>}
                <form className='w-3/6 form-control rounded-xl ml-6 flex items-center ' onSubmit={handleSearch}>
                    <div className='flex flex-row w-full'>
                        <label for="" className='text-2xl mx-1 flex items-center'><AiOutlineSearch /></label>
                        {isLoading ? <>...loading</> :
                            data.quantity == 0 ? "don't have any product" :
                                <Autocomplete
                                    onChange={handleChange}
                                    disablePortal
                                    options={data.data}
                                    size="small"
                                    sx={{ width: 100 + "%" }}
                                    freeSolo
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`${option.image}`}
                                                alt=""
                                            />
                                            {option.label} {option.name} (type {option.type})
                                        </Box>
                                    )}
                                    renderInput={(params) => <TextField   {...params} onChange={(e) => { setSearch(e.target.value) }} value={search} label="Search" />}
                                />}
                    </div>
                    <div className=''>
                        <input type="submit" name="" className='mx-2 p-2 rounded-md text-white bg-blue-300 hover:bg-blue-400' value="Search" />
                    </div>
                </form>


            </div>

        </>
    );
}

export default Idea;