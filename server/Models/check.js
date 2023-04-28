let isuser= (req,res, next)=>{
    
    if(req.session.user){
        if(req.session.user.isUser){
            next()
            return
        }
    }
    res.json({isSuccess:false,message:"you don't have acess"})
}
let isadmin = (req,res, next)=>{
    if(req.session.user){
        if(req.session.user.isAdmin){
            next()
            return
        }
    } 
    res.json({isSuccess:false,message:"you don't have acess"})
}
let ismanager = (req,res, next)=>{
   
    if(req.session.user){
        if(req.session.user.isManager){
            
       
            next()
            return
        }
    } 
    res.json({isSuccess:false,message:"you don't have acess"})
}
exports.isuser = isuser
exports.isadmin = isadmin
exports.ismanager = ismanager