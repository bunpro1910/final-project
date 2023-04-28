
const express = require('express');
const Manager_Routes = express.Router()
const addcategory = require('./Manager_Routes/addcategory')
const addproduct = require('./Manager_Routes/addproduct')
const deletecate = require('./Manager_Routes/deletecategory')
const deletepro = require('./Manager_Routes/deleteproduct')
const invoice = require('./Manager_Routes/invoice')
const cartdetail = require('./Manager_Routes/cartdetail')
const invoicestatus = require('./Manager_Routes/invoicestatus')
const totalinvoice = require('./Manager_Routes/totalinvoice')
const deleteinvoice = require('./Manager_Routes/deleteinvoice')
const deletebrand = require('./Manager_Routes/deletebrand')
const datainvoice = require('./Manager_Routes/datainvoice')
const addbrand = require('./Manager_Routes/addbrand')
const multer  = require('multer')
const bestsaler = require('./Manager_Routes/bestsaler')
const totaluser = require('./Manager_Routes/totaluser')
const datainvoicebymonth =require('./Manager_Routes/datainvoicebymonth')
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

Manager_Routes.post('/addcategory',addcategory)

Manager_Routes.post('/addbrand',addbrand)
Manager_Routes.post('/addproduct',upload.single('image'),addproduct)
Manager_Routes.post("/deleteinvoice",deleteinvoice)
Manager_Routes.get('/invoice',invoice)
Manager_Routes.post('/changestatus',invoicestatus)
Manager_Routes.post('/deletebrand',deletebrand)
Manager_Routes.post('/deletecate',deletecate)
Manager_Routes.get('/bestsaler',bestsaler)
Manager_Routes.get('/cartdetail',cartdetail)
Manager_Routes.get('/datainvoice',datainvoice)
Manager_Routes.get('/totalinvoice',totalinvoice)
Manager_Routes.get('/datainvoicebymonth',datainvoicebymonth)
Manager_Routes.get('/totaluser',totaluser)
Manager_Routes.post('/deletepro',deletepro)

module.exports = Manager_Routes