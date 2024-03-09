const schema = require("../mongose_schema/Schema")
const bcrypt = require("bcryptjs");
const home = async (req,res) =>{
    try{    
        res.status(200).send("Welcome router page by using controller");
    }catch(error){
        console.log(error)
    }
}


const login = async (req,res,next) =>{
    try{
        
        const {email,password} = req.body;
        const CheckUser = await schema.User.findOne({email});
        


        if(!CheckUser){
            const error = {
                
                message:"tu kya kar rha hai"
            }
            next(error)
        }

        const checkUser = await CheckUser.Comparepassword(password);
        
    
        if(checkUser){
             res.status(200).json({message:"Login Successfull",idtoken:await CheckUser.generateToken(),id:CheckUser._id.toString()})
        }else{
            const error = {
                
                message:"mu ko aya hat nahi lga"
            }
            next(error)
           
        }
    }catch(err){
        const error = {
            
            message:"Kya kar rha hai"
        }
        next(error)

    }
}

const signup = async (req,res,next) =>{
    try{    
        
        const {username,email,phone,password} = req.body;
        
        const userExist = await schema.User.findOne({email});
        if(userExist){
            
            const error = {
               
                message:"User Exist"
            }
            next(error)
        }

        const register = await schema.User.create({username,email,phone,password});

        res.status(201).json({message:"Succefull Registered",idtoken: await register.generateToken(),userId:register._id.toString()});
    }catch(err){
        const error = {
           
            message:"tu kya kar rha hai"
        }
        next(error)
    }
}


const contact = async (req,res,next) =>{
    try{
        const {username,email,message} = req.body;
       

        const isUser =  await schema.User.findOne({email});
       
        
        
        if(!isUser){
            const error = {
                
                message:"Tu toh bol he nahi skta"
            }
            next(error);
        }
        
        const checkname =  await isUser.comparename(username);
        console.log("true") 

        if(checkname){
            const contactmessage = await schema.Contact.create({username,email,message});
            res.status(200).json({message:"sucessfull submit"});
        }else{
            const error = {
              
                message:"Kon ha tu ya ko ta nahi hai"
            }
        }


    }catch(err){
        const error = {
            message:"Tu ksa bol rha hai true",
           
        }

        next(error);
    }
}

const user = async (req,res) =>{

    try{
        const userData = req.user;
        if(!userData){
            return res.status(500).json({msg:"User Not Valid"})
        }

        return res.status(200).json({userData});
        
    }catch(err){
       console.log(err)
    }
    


}


module.exports = {home,signup,login,contact,user}
