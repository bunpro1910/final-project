const express = require('express');
const Main_Routes = express.Router()
const path = require('path')
const fs = require('fs')


const loginroutes = require("./Main_Routes/login")
const handlelogin = require("./Main_Routes/loginhandle")

const logoutroutes = require("./Main_Routes/logout")

const register = require("./Main_Routes/register")
const category = require("./Main_Routes/category")
const forgetpass = require("./Main_Routes/forgetpass")
const product = require("./Main_Routes/product")
const brand = require("./Main_Routes/brand")
const verify = require("./Main_Routes/verify")
const productdetail = require("./Main_Routes/productdetail")
const productbycate =require("./Main_Routes/productbycate")
Main_Routes.get("/authentication",loginroutes)
Main_Routes.get("/logout",logoutroutes)
Main_Routes.get("/productbycate",productbycate)
//post
Main_Routes.post('/forgetpass',forgetpass)
Main_Routes.post("/verify",verify)

Main_Routes.post("/register",register)

Main_Routes.post("/authentication",handlelogin)

Main_Routes.get("/product",product)
Main_Routes.get("/brand",brand)
Main_Routes.get("/productdetail",productdetail)
Main_Routes.get("/category",category)
module.exports = Main_Routes