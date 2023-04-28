

import {Link, Outlet}from 'react-router-dom'
import {useState,useEffect} from 'react'
import { AiFillMail,AiFillGithub,AiFillYoutube  } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { BsPinMapFill,BsFillTelephoneFill  } from 'react-icons/bs';

function Footer() {

  useEffect(()=>{
    

  },[])
  return (

     <>
            <div className='mt-40'>
                <div className='footer-content grid xl:grid-cols-3 md:grid-cols-2 bg-zinc-800 shadow '>
                    <div className='fotter-list'>
                        <h3 className='footer-name text-white uppercase'>Contact</h3>
                        <ul className='text-gray-400'>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><a className='hover:!text-rose-600 hover:no-underline flex flex-row ' href="tel:+84376328545" > <BsFillTelephoneFill className="icons mr-2" />  0918533246 </a>   </li>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><p className='flex flex-row'><BsPinMapFill className="icons mr-2 " /> Address: Da Lat </p></li>
                            <li className='transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><a className='hover:!text-rose-600 hover:no-underline flex flex-row' href="malto:sonplhgcs190828@fpt.edu.vn" > <AiFillMail className="icons mr-2" />  Email: sonplhgcs190828@fpt.edu.vn </a>   </li>

                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name text-white uppercase'>Project Link</h3>
                        <ul className='text-gray-400'>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer ' ><a className='hover:!text-rose-600 hover:no-underline flex flex-row' href="https://www.facebook.com/groups/fgw.comp1640.2023.01" target='_blank'><FaFacebook className="icons mr-2" /> Facebook</a></li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'><a className='hover:!text-rose-600 hover:no-underline flex flex-row' href="https://github.com/bunpro1910/cms_23"><AiFillGithub className="icons mr-2" /> Github</a>   </li>
                            
                        </ul>
                    </div>
                    <div className='fotter-list'>
                        <h3 className='footer-name text-white uppercase'>About</h3>
                        <ul className='text-gray-400'>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'>Made by Pham Le Hai Son</li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'>GCS190828</li>
                            <li className=' transition-all ml-4 my-2 ease-in-out duration-500 hover:text-rose-600  hover:pl-20 hover:border-none hover:cursor-pointer'></li>
                        </ul>
                    </div>
                </div>
            </div>
    
     </>
  );
}

export default Footer;
