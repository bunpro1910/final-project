
const express = require('express');
const Admin_Routes = express.Router()

const account = require('./Admin_Routes/account')
const deleterole = require('./Admin_Routes/deleterole')
const role = require('./Admin_Routes/role')
const multer  = require('multer')
const adduser = require('./Admin_Routes/adduser')
const addrole = require('./Admin_Routes/addrole')
const deleteuser = require('./Admin_Routes/deleteuser')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req)
        cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
        console.log(req)
        cb(null, Date.now() + "-" + file.originalname);
    }
})
var upload = multer({
    storage: storage,
})


Admin_Routes.get('/account',account)
Admin_Routes.get('/role',role)
Admin_Routes.post('/deleterole',deleterole)
Admin_Routes.post('/addrole',addrole)
Admin_Routes.post('/deleteuser',deleteuser)
Admin_Routes.post('/adduser',adduser)
module.exports = Admin_Routes