

import {Link,Outlet,useLocation,useNavigate}from 'react-router-dom'
import {useState,useEffect,useRef} from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import {useQuery ,useQueries}from 'react-query'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import { toast } from 'react-toastify';

function Login() {
  const location = useLocation()
  const [enable,setenable] = useState(false)
  const [show,setshow] = useState(false)
  const navigate = useNavigate()

  let getcategory =()=> axios.get(`/category?id=${location.state.id}`).then((res) => res.data)
  
  const { isLoading , error , data , isFetching,refetch  } = useQuery(['category',!location.state?"":location.state.id],getcategory,{ enabled:enable })
  const descriptionElementRef = useRef(null);
  let [category,setcategory] = useState(data?{id:data.category[0].id,name:data.category[0].name}:
      {
          id:'',
          name:'',

      }
  )
  const handleClose = (e) => {
    setshow(false);
    setcategory({id:'',name:''})
  };
  const gotocate = (e)=>{
    navigate('../category')
  }
       let submit_handle= async(e)=> {
        e.preventDefault()
        let result 
        if(!enable){
          result = await axios.post('/admin/addcategory',{category:category,isupdated:false})
        }else{
          if(category.id == data.category[0].id){
            result = await axios.post('/admin/addcategory',{category:category,isupdated:true})
          }else{
            result = await axios.post('/admin/addcategory',{category:category,isupdated:true,isupdatedid:true,oldid:data.category[0].id})
          }
          
        }
        if(result.data.isSuccess){
          if(!enable){
            setshow(true)
          }else{
            navigate('../category')
          }
       
        }
        if(result.data.isSuccess){
          toast.success(result.data.message)
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
      setcategory({id:data.category[0].id,name:data.category[0].name})
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
            Do You Want to add another category
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <button className="btn btn-primary" onClick={gotocate}>Back to Category</button>
          <button  className="btn btn-primary" onClick={handleClose}>Add new Category</button>
          
        </DialogActions>
      </Dialog>

    <div className="container">
      
      <Link to='../category'>Back to List</Link>
      <form className="bg-teal-300 p-4 rounded-md">
       
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category ID</label>
        <input type="text" onChange={(e)=>{category.id = e.target.value; setcategory({...category})}} value={category.id} class="form-control"/>
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category Name</label>
        <input type="text" class="form-control" onChange={(e)=>{category.name = e.target.value; setcategory({...category})}} value={category.name}/>
      </div>
      <button type="submit btn btn-primary" onClick={submit_handle} class="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
    
  );
}

export default Login;
