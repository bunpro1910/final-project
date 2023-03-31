

import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import Dialog from '@mui/material/Dialog';
import axios from'axios'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Footer() {
    let [confirm,setconfirm ] = useState(true)
    let [form,setform] = useState({code:''})
    let [message,setmessage] = useState()
    const handleSubmit =async (e)=>{
        e.preventDefault();
        let result = await axios.post('/verify',{form:form})
        setmessage(<p className={result.data.isSuccess?"success":"err"}> {result.data.message} </p>)  
    }

    let handleClose = (e) => {
        setconfirm(false)

    }
    useEffect(() => {

    }, [confirm])

    return (

        <>
            <Dialog open={confirm} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>
                <DialogTitle > Forget password</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText tabIndex={-1} >
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Confirm Code</label>
                                <input type="text" onChange={(e) => { form.code = e.target.value; setform({ ...form }) }} value={form.code} class="form-control" />
                            </div>
                            <button className="btn btn-danger" type='submit' > Submit</button>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>           
                    <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
                   </DialogActions>
            </Dialog>
        </>
    );
}

export default Footer;
