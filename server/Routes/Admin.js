
const express = require('express');
const Admin_Routes = express.Router()
const addcategory = require('./Admin_Routes/addcategory')
const addproduct = require('./Admin_Routes/addproduct')
const deletecate = require('./Admin_Routes/deletecategory')
const deletepro = require('./Admin_Routes/deleteproduct')
const invoice = require('./Admin_Routes/invoice')
const cartdetail = require('./Admin_Routes/cartdetail')
const invoicestatus = require('./Admin_Routes/invoicestatus')
const account = require('./Admin_Routes/account')
const deleteinvoice = require('./Admin_Routes/deleteinvoice')
const datainvoice = require('./Admin_Routes/datainvoice')
const addbrand = require('./Admin_Routes/addbrand')
datainvoice
const multer  = require('multer')
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

Admin_Routes.post('/addcategory',addcategory)

Admin_Routes.post('/addbrand',addbrand)
Admin_Routes.post('/addproduct',upload.single('image'),addproduct)
Admin_Routes.post("/deleteinvoice",deleteinvoice)
Admin_Routes.get('/invoice',invoice)
Admin_Routes.post('/changestatus',invoicestatus)
Admin_Routes.post('/deletecate',deletecate)
Admin_Routes.get('/cartdetail',cartdetail)
Admin_Routes.get('/datainvoice',datainvoice)
Admin_Routes.get('/account',account)
Admin_Routes.post('/deletepro',deletepro)
module.exports = Admin_Routes