
const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
    const months = [
        { label: "January", value: 0 },
        { label: "February", value: 0 },
        { label: "March", value: 0 },
        { label: "April", value: 0 },
        { label: "May", value: 0 },
        { label: "June", value: 0 },
        { label: "July", value: 0 },
        { label: "August", value: 0 },
        { label: "September", value: 0 },
        { label: "October", value: 0 },
        { label: "November", value: 0 },
        { label: "December", value: 0 }
      ];
    let query = `select * from public.invoice`
    let result = await connect(query)

    let arr = result.rows.reduce((init,item,i)=>{
        let month = new Date(item.date).getMonth()
        months[month] = {label:months[month].label,value:months[month].value+1  }

    },[])
    

    res.json({data:months,quantity:result.rows.length})



}

module.exports = addtopic
