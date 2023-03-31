

import {Link,Outlet,useLocation,useNavigate}from 'react-router-dom'
import {useState,useEffect,useRef} from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import {useQuery ,useQueries}from 'react-query'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const location = useLocation()
  const [enable,setenable] = useState(false)
  const [show,setshow] = useState(false)
  const navigate = useNavigate()

  let getbrand =()=> axios.get(`/api/brand?id=${location.state.id}`).then((res) => res.data)
  
  const { isLoading , error , data , isFetching,refetch  } = useQuery(['brand',!location.state?"":location.state.id],getbrand,{ enabled:enable })
  const descriptionElementRef = useRef(null);
  let [brand,setbrand] = useState(data?{id:data.brand[0].id,name:data.brand[0].name}:
      {
          id:'',
          name:'',

      }
  )
  const handleClose = (e) => {
    setshow(false);
    setbrand({id:'',name:''})
  };
  const gotocate = (e)=>{
    navigate('../brand')
  }
       let submit_handle= async(e)=> {
        e.preventDefault()
        let result 
        if(!enable){
          result = await axios.post(`/api/admin/addbrand`,{brand:brand,isupdated:false})
        }else{
          if(brand.id == data.brand[0].id){
            result = await axios.post(`/api/admin/addbrand`,{brand:brand,isupdated:true})
          }else{
            result = await axios.post(`/api/admin/addbrand`,{brand:brand,isupdated:true,isupdatedid:true,oldid:data.brand[0].id})
        }    
        }
        if(result.data.isSuccess){
          toast.success(result.data.message)
          if(!enable){
            setshow(true)
          }else{
            navigate('../brand')
          }
       
        }else{
          toast.error(result.data.message)
        }
      }

  useEffect(()=>{
    if(location.state){
      if(location.state.id){
        setenable (true)
      }
    }
    if(show){
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if(enable){
      setbrand({id:data.brand[0].id,name:data.brand[0].name})
    }
   
  },[data])
  if(isLoading)return (<>...loading</>)

  
  console.log(data)
  return (
    <>
        <ReactNotifications/>
     <Dialog
        open={show}
        onClose={handleClose}
        scroll= 'paper'
        fullWidth={true}
        maxWidth= 'md'
      >
        <DialogTitle id="scroll-dialog-title">View</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Do You Want to add another brand
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <button className="btn btn-primary" onClick={gotocate}>Back to brand</button>
          <button  className="btn btn-primary" onClick={handleClose}>Add new brand</button>
          
        </DialogActions>
      </Dialog>

    <div className="container">
      
      <Link to='../brand'>Back to List</Link>
      <form className="bg-teal-300 p-4 rounded-md">
       
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">brand Name</label>
        <input type="text" class="form-control" onChange={(e)=>{brand.name = e.target.value; setbrand({...brand})}} value={brand.name}/>
      </div>
      <button type="submit btn btn-primary" onClick={submit_handle} class="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
    
  );
}

export default Login;
