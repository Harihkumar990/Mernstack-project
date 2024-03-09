const elements = require("../mongose_schema/Schema");


const userscontroller = async (req,res) =>{

    try {
        const usersdata = await elements.User.find({isAdmin:{$ne:true}},{password:0});
        if(!usersdata){
            return res.status(200).json({message:"Users Not Found"})
        }
        return res.status(200).json({message:usersdata});
    } catch (err) {
        console.log(err);
    }


}

const contactscontrolller = async (req,res) =>{

    try {
        const usersdata = await elements.Contact.find();
        if(!usersdata){
            return res.status(200).json({message:"Users Not Found"})
        }
        return res.status(200).json({message:usersdata});
    } catch (err) {
        console.log(err);
    }


}


const delteuser = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const response = await elements.User.deleteOne({_id:id});
        if(response){
            return res.status(200).json({message:"Delete Successfull"});
        }
        

    } catch (error) {
        console.log(error)
    }
    
}

const contatdelete = async (req,res,next) =>{
    try{

        let id = req.params.id;

        const contact = await elements.Contact.deleteOne({_id:id});
       
        if(!contact){
            return res.status(200).json({message:"Something Wrong! "})
        }
        return res.status(200).json({message:"Delete Successfull"})
        


    }catch(err){
        next(err)
    }
}

const updateuserdata = async (req,res,next) =>{
    try {
        
        const id = req.params.id;
        
        const userData = req.body;
       
    
        const UpdatedFile = await elements.User.updateOne({_id:id},{$set:userData});
        
        if(!UpdatedFile){
            return res.status(404).json({message:"Sorry For this Unconditiona behaviour"});
        }

        return res.status(200).json({message:UpdatedFile});

        


    } catch (error) {
        next(error)
    }
}

const updatecontactdata = async (req,res,next) =>{
    try {
        
        const id = req.params.id;
        const contactData = req.body;
        const UpdateContact = await elements.Contact.updateOne({_id:id},{$set:contactData});
        
        if(!UpdateContact){
            return res.status(200).json({message:"Data Not Updated Server Face Some Error"});

        }
        return res.status(200).json({message:"Data Updated"});


    }catch(error) {
        next(error)
    }
}



module.exports = {userscontroller,contactscontrolller,delteuser,updateuserdata,contatdelete,updatecontactdata}