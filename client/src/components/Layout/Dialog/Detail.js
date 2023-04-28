
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'

import { FiEdit } from 'react-icons/fi'
import Backbutton from '../../Backbutton'
import { RiDeleteBinLine } from 'react-icons/ri'
import { ReactNotifications, Store } from 'react-notifications-component'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
function Category({ Content, show, setshow, handledelete }) {
    const handleClose = (e) => {
        setshow(false)
    }
    useEffect(() => {

    }, [])

    return (
        <>
            <Dialog open={show} onClose={handleClose} scroll='paper' fullWidth={true} maxWidth='md'>
                <DialogTitle > Detail Product</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText tabIndex={-1} >
                        {Content} 
                    </DialogContentText>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default Category;
