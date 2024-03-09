const jwt = require("jsonwebtoken");
const requiredata = require("../mongose_schema/Schema");

const verifyjwtToken =async (req,res,next) =>{

    let token = req.header("Authorization") || "";
    if(!token){
        return res.status(200).json({msg:"Some Error Ocurred"});
    }
    

    try{
        let isverify = jwt.verify(token,process.env.JWT_CODE);
        let data = await requiredata.User.findOne({email:isverify.email}).select({password:0}) ;
        req.user = data;
        req.token = token;
        req.userId = data._id
        next();
    }catch(err){
        console.log(err);
        next();
    }



    next();
   

    

   
    
    

}

module.exports = verifyjwtToken;