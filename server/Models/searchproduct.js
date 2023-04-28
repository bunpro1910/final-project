let isuser= (req,res, next)=>{
    
    if(req.session.user){
        if(req.session.user.roleid ==1 ||req.session.user.roleid ==2){
            next()
            return
        }
    }
    res.json({err:"you don't have acess"})
}
let isadmin = (req,res, next)=>{
    if(req.session.user){
        if(req.session.user.roleid ==2){
            next()
        }
    } 
    res.json({err:"you don't have acess"})
}
exports.isuser = isuser
exports.isadmin = isadmin