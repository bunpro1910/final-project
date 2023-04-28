
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useQuery, useQueries } from 'react-query'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Category({ form, show,setshow ,handleSearch,handleReset }) {

    const handleCloseSearch =(e)=>{
        setshow(false)
    }
    useEffect(() => {
    }, [])


    return (
        <>
            <Dialog open={show} onClose={handleCloseSearch} scroll='paper' fullWidth={true} maxWidth='md'>
                <DialogTitle > Search</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText tabIndex={-1} >
                        {form}
                    </DialogContentText>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={handleCloseSearch}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleReset}>Reset</button>
                        <button className="btn btn-danger" onClick={handleSearch}>Search</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>


        </>
    );
}

export default Category;
