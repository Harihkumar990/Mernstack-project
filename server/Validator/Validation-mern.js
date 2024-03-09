const  z  = require("zod");

const validation_signup = z.object({
    username:z.string({required_error:"Name is require"})
    .trim()
    .min(3,{message:"Name must at least three letters"})
    .max(20,{message:"Name should not greater than 10 letters"}),

    email:z.string({required_error:"Email is require"})
    .trim()
    .email({message:"Invalid Email"}),

    phone:z.string({required_error:"Number is require"})
    .trim()
    .min(10,{message:"Phone must be 10 letters"})
    .max(10,{message:"Phone must be 10 letters"}),
    password:z.string({required_error:"Password is require"})
    .trim()
    .min(8,{message:"Password must be 8 letters"})
    .max(16,{message:"Password should not greater than 16 letters"})
})

const validation_login = z.object({
    email:z.string({required_error:"invalid"})
    .trim()
    .email({message:"invalid email"}),
    password:z.string({required_error:"invalid password"})
    .trim()
})

const validation_contact =z.object({
    username:z.string({required_error:"Name Required"})
    .trim()
    ,

    email:z.string({required_error:"Email required"})
    .trim()
    .email({message:"Invalid Email"}),

    message:z.string({required_error:"Meassgae Required"})
    .trim()
    .min(25,{message:"must be Minimum 25 letter"})

    
})


module.exports = {validation_signup,validation_login,validation_contact};