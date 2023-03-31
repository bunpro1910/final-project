

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
function Footer({ show, setshow }) {
    const [form,setform] = useState({
        password:'',
        newpass:'',
        renewpass:''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await axios.post(`/api/user/changepass`, { form: form })
        if(result.data.isSuccess){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message)
        }
    }

    let handleClose = (e) => {
        setshow(false)
    }
    useEffect(() => {

    }, [show])

    return (

        <div>
           
            <Dialog open={show} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>

                <DialogTitle > Change password</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText tabIndex={-1} >
                       
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">password</label>
                                <input type="password" onChange={(e) => { form.password = e.target.value; setform({ ...form }) }} value={form.password} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">New pass</label>
                                <input type="password" onChange={(e) => { form.newpass = e.target.value; setform({ ...form }) }} value={form.newpass} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Confirm pass</label>
                                <input type="password" onChange={(e) => { form.renewpass = e.target.value; setform({ ...form }) }} value={form.renewpass} class="form-control" />
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
