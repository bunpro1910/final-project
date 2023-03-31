
const express = require('express');
const User_Routes = express.Router()

const addcart = require('./User/addcart')
const cart = require('./User/cart')
const deletecart = require('./User/deletecart')
const updatecart = require('./User/updatecart')
const checkout = require('./User/checkout')
const history = require('./User/history')
const changepass = require('./User/changepass')
const updateprofile = require('./User/updateprofile')
const payal =require('./User/payal')
const success = require('./User/success')
User_Routes.post('/addcart',addcart)
User_Routes.get('/cart',cart)
User_Routes.post('/updatecart',updatecart)
User_Routes.post('/deletecart',deletecart)
User_Routes.post('/checkout',checkout)
User_Routes.post('/payal',payal)
User_Routes.get('/payal/success',success)
User_Routes.post('/changepass',changepass)
User_Routes.post('/updateprofile',updateprofile)

User_Routes.get('/history',history)
module.exports = User_Routes