
const path = require('path')
let logout =(req,res)=>{
    req.session =null
    res.json({isSuccess:true,message:"Logout Successfully"})
    
    global.io.emit('authentication',{body:true})

}
module.exports =logout