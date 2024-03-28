import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isloggedin,setisloggedin] = useState(localStorage.getItem("token"));
    const [userdata, setuserdata] = useState("");
    const [checkloggedin,setcheckloggedin] = useState( isloggedin ? true : false )
    const [products,setproducts] = useState([]);
   
   
   
   
    const storeTokenInLS = (servertoken) =>{
        setcheckloggedin(true)
        localStorage.setItem("token",servertoken);
        setisloggedin(servertoken);
        
    }
    const getdata =  async (type) => {
        let value;
        if(type==="users"){
            value = "user";
        }else if(type==="contacts"){
            value = "contacts";
        }
        try {
            
            if(value?.length>0){
                const response = await fetch(`http://localhost:5000/admin/${value}`,{
                method:"GET"

            })
            const {message} = await response.json();
            if(response.ok){
                return message

            }else{
                return message;
            }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleuserbyadmin =async (id,type) =>{
        try {
            
            const response = await  fetch( type === "users"  ?  `http://localhost:5000/admin/userdelete/${id}`:`http://localhost:5000/admin/user/contact/delete/${id}` ,{
                method:"DELETE"
            })
            if(response){
                return true;
                
            }else{
                return false;
            }

        } catch (error) {
            alert(error)
        }
    }

     
    useEffect(()=>{
       
        const userAuth =async () =>{
            if(isloggedin){
             
                try{
    
                    const response = await fetch("http://localhost:5000/api/user",{
                        method:"GET",
                        headers:{
                            Authorization:isloggedin
                        }
        
                    })
                    
                    if(response.ok){
                        
                        let user = await response.json();
                        
                        setuserdata(user.userData);

                    }else{
                        setcheckloggedin(false)
                        localStorage.removeItem("token");
                        alert("user login again")
                    }
                }catch(err){
                    setcheckloggedin(false)
                    alert("Invalid User Please Login Again")
                    
                }
            }else{
                setuserdata([])
            }
            
            
        }
        userAuth();
    },[isloggedin])

    const logout = () =>{
        setisloggedin("");
        setcheckloggedin(false)
        localStorage.removeItem("token");
        
    }

    useEffect(()=>{
        
       if(checkloggedin){
        const getdata =async () =>{
            try {
                
                const response = await fetch("http://localhost:5000/products/service",{
                    method:"GET"

                })
                if(response.ok){
                    const {data}  =  await response.json() 
                    setproducts(data);
                }else{
                    setproducts([]);
                }


            } catch (err) {
                console.log(err)
            }
        }

        getdata();
       }else{
        setproducts([])
       }



    },[checkloggedin])
       
        
    


    

    

    const UpdateUser = async (id,edituser,type) => {
        
         
        try {
            const response = await fetch(type === "users" ? `http://localhost:5000/admin/user/update/${id}` : `http://localhost:5000/admin/user/contact/update/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(edituser)
            })

            if(response.ok){
                return true
            }else{
                return false
            }
        } catch (error) {
            alert("Something is wrong!!")
        }
    }

    

    
   


    return(
        <AuthContext.Provider value = {{UpdateUser,storeTokenInLS,checkloggedin,logout,userdata,products,getdata,handleuserbyadmin}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    let userHook = useContext(AuthContext);
    if(!userHook){
        throw new Error("useAuth used outside of the provider");
    }
    return userHook;
} 