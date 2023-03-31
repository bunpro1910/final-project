

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { ReactNotifications, Store } from 'react-notifications-component'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
function Footer({ showforget, setshowforget }) {
    let [confirm, setconfirm] = useState(false)
    let [form, setform] = useState({ username: '' })
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await axios.post(`/api/forgetpass`, { form: form })
            if(result.data.isSuccess){
                toast.success(result.data.message)
            }else{
                toast.error(result.data.message)
            }
          
    }

    let handleClose = (e) => {
        setshowforget(false)

    }
    useEffect(() => {

    }, [confirm])

    return (

        <div>
           
            <Dialog open={showforget} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>

                <DialogTitle > Forget password</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText tabIndex={-1} >
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">username</label>
                                <input type="text" onChange={(e) => { form.username = e.target.value; setform({ ...form }) }} value={form.username} class="form-control" />
                            </div>
                            <button className="btn btn-primary" type='submit' > Submit</button>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Footer;
