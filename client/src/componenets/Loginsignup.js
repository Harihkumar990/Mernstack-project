import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {useNavigate} from "react-router-dom"
import Modal from "./modal";
import { useAuth } from "./context";

const LoginAndSignup = () =>{
    const [error,seterror] = useState("Something Went Wrong");
    const navigat = useNavigate();
    
    const [condition,setcondition] = useState(1);
    const [modal,setmodal] = useState(false);
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();

            tl.from(".animate-box",{
                xPercent:200,
                duration:0.5,
                width:800
                
            })
            tl.from(".animated-email",{
                width:100,
                ease:"back.inOut",
                duration:0.5
            })
            .from(".animate-login",{
                rotateZ:90,
                xPercent:-60,
                yPercent:300,
                ease:"elastic",
                duration:0.5
            })
            .from(".animate-login-btn",{
                xPercent:-50,
                ease:"bounce.out"
            })
            .from(".animate-signup-btn",{
                xPercent:50,
                ease:"bounce.out"
            },1.5)
            
            
            
            
            

        },comp)

        return () => ctx.revert();
    },[])

    
   

    



    const [islogin,setlogin] = useState('true');
    const [existuser,setexistuser] = useState({
        email:"",
        password:""
    })

    const [newuser,setnewuser] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })

    const handleinput = (e,type)=>{
        if(type === 1){
            setexistuser({
                ...existuser,
                [e.target.name]:e.target.value
            })
        }else if(type === -1){
            setnewuser({
                ...newuser,
                [e.target.name]:e.target.value
            })
        }
    }

   

    const handlecondition  = (value) =>{
        switch(value){
            case 1:
                setlogin(true);
                setcondition(value);
                break;
            case -1:
                setlogin(false);
                setcondition(value);
                break
            default:
                break;
        }
    }

    const {storeTokenInLS} = useAuth();
    
    const handlesubmit = async (e)=>{
       


        e.preventDefault();
        
        let category = "";

        if(condition === 1){
          
            category = "login"

        }else if(condition === -1){
            
            category = "signup"
        }
        
        try{
            
            
            const response = await fetch(`http://localhost:5000/api/${category}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: condition === 1 ? JSON.stringify(existuser) : JSON.stringify(newuser)   
            })
            
            if(response.ok){
                
                condition ===1 ? setexistuser({
                    email:"",
                    password:""
                }): setnewuser({
                    username:"",
                    email:"",
                    phone:"",
                    password:""

                })
                const {idtoken} = await response.json()
                
                storeTokenInLS(idtoken);
                
                navigat("/")
              
            }
            else{
                const {message} = await response.json();
                seterror(message)
                
                setmodal(true)
                setTimeout(() => {
                    setmodal(false)
                    console.log("indise timeout")
                }, 4000);
            
                
            }
        }catch(err){
            console.log(err.message);
            setmodal(true)
            
        }
    }
    
   
    
    
        
    
    

    return(
        <>
            <main  ref={comp} className=" grid place-content-center h-screen" >
                        
                <div  className=" animate-box  bg-slate-300 rounded-2xl  w-96 h-auto  " >
                    <section className="border-b-2 border-slate-950  justify-center gap-2 flex p-3 m-4  "  >
                        <button onClick={() =>  handlecondition(1)}    className={ islogin ?  " animate-login-btn border w-36  bg-slate-600 text-white relative   border-slate-800 hover:scale-105 hover:bg-red-500 font-bold rounded-md":"border w-36  relative   border-slate-800 hover:scale-105 hover:bg-red-500 font-bold rounded-md"} >Login</button>
                        <button onClick={ () => handlecondition(-1)}  className={ !islogin ?  "  border w-36  bg-slate-600 text-white relative   border-slate-800 hover:scale-105 hover:bg-red-500 font-bold rounded-md":"border w-36  relative   border-slate-800 hover:scale-105 hover:bg-red-500 font-bold animate-signup-btn rounded-md"}>Signup</button>
                    </section>
                    {islogin ? 
                        <form onSubmit={handlesubmit}  className="flex flex-col relative bottom-4 left-8 h-64 p-4 my-6  w-80  " >
                            <p className=" animate-login text-2xl font-mono font-extrabold border-b-2 border-dotted text-center border-red-600 " >Login</p>
                            <input placeholder="Enter Email"  onChange={(e) => handleinput(e,1)} name={"email"}  value={existuser.email }  className=" animated-email border-b-2 my-6 focus:outline-none bg-transparent border-slate-700" type="text"  />
                            
                            <input placeholder="Enter Password"  onChange={(e) => handleinput(e,1)} name={"password"}  value={existuser.password} className=" animated-email border-b-2 my-6 focus:outline-none bg-transparent border-slate-700"  type="password"  />
                            <button className="border max-w-60 relative  left-7 top-8 h-8 font-extrabold hover:scale-105 hover:bg-red-500  border-slate-800  rounded-md"  >Submit</button>
                        </form>:
                        <form  onSubmit={handlesubmit}  className=" h-auto flex flex-col relative bottom-4 left-8  p-4 my-6  w-80  " >
                            <p className="text-2xl font-mono font-extrabold border-b-2 border-dotted text-center border-red-600 " >Signup</p>
                            <input placeholder="Enter Name"    onChange={(e) => handleinput(e,-1)} name={"username"}  value={newuser.username } className=" animate-signup border-b-2 my-6 focus:outline-none bg-transparent border-slate-700" type="text"  />
                            <input placeholder="Enter Email"   onChange={(e) => handleinput(e,-1)} name={"email"}  value={newuser.email } className=" animate-signup border-b-2 my-6 focus:outline-none bg-transparent border-slate-700" type="text"  />
                            <input placeholder="Enter Number"   onChange={(e) => handleinput(e,-1)} name={"phone"}  value={newuser.phone} className=" animate-signup border-b-2 my-6 focus:outline-none bg-transparent border-slate-700" type="text"  />
                            
                        <input placeholder="Enter Password"   onChange={(e) => handleinput(e,-1)} name={"password"}  value={newuser.password }  className=" animate-signup border-b-2 my-6 focus:outline-none bg-transparent border-slate-700"  type="password"  />
                            <button className="border max-w-60 relative  left-7 top-8 h-8 font-extrabold hover:scale-105 hover:bg-red-500  border-slate-800  rounded-md"  >Submit</button>
                        </form>
                    }
                </div> 
                {
                    modal &&<Modal>
                    <main className= " animate-modal  absolute w-full  top-20  flex justify-end " >
                        <div className="px-1 w-auto  py-0.5 text-center " >
                            <span className="text-gray-300" >{error} </span>
                            <div className="h-1 rounded-b-lg border-b-4  w-full bg-white " ></div>    
                        </div>
                        
                    </main>
                </Modal>
                }
                

            </main>

        </>
    )
}


export default LoginAndSignup;