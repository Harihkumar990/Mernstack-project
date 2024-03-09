const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const { string } = require("zod");
const MOngosSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

const ContactSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
      type:String,
      require:true,

    },
    message:{
        type:String,
        require:true
    }
})

/*
MOngosSchema.pre('save',async function(next){
    const user = this;

    if(!user.isModified('password')){
        next();
    }
    try{
        hash_passwd = "79496161";
        user.password = hash_passwd;
    }catch(err){
        next(err)
    }
})*/

MOngosSchema.methods.Comparepassword = async function(password){
    if(this.password === password){
        return true
    }
}

MOngosSchema.methods.generateToken = async function() {
    try{
        return jwttoken.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
            process.env.JWT_CODE, {
                expiresIn:'1d',
            }
        )
    }catch(err){
        console.log(err)
    }
}


MOngosSchema.methods.comparename =  async function (name){
    
    if(this.username === name){
        
        return true;
    }
}


const User = new mongoose.model("User",MOngosSchema);

const Contact = new mongoose.model("Contact",ContactSchema);

module.exports = {User,Contact};