import { NavLink, useNavigate} from "react-router-dom";
import gsap from "gsap";
import { useAuth } from "./context";
import { useState,useEffect,useRef } from "react";








const Navbar = () =>{
    const [modal,setmodal] = useState(false)
    const {checkloggedin,logout,userdata} = useAuth();
    const navigat = useNavigate();
   

    let comp = useRef();
    useEffect(()=>{
    const ctx = gsap.context(()=>{
        let tl = gsap.timeline();
        tl.from(".animation",{
            opacity:0,
            xPercent:-50,
            duration:1,
            ease:"bounce",
        

        })
        tl.from(".butt",{
            yPercent:-160,
            stagger:0.3,
            duration:0.5,
            ease:"back.inOut"
        })
    },comp)
    return ()=>ctx.revert();
   },[])

   const handlemodal = () =>{
    setmodal(prev => !prev);
    
   }
   const  hadnlelogout = () =>{
        
        logout();
        setmodal(false)
        
        navigat("/login/signup")
   }
    

   
    return(
        <nav  ref={comp}>

            <header className="  flex justify-between border  border-cyan-950  rounded-lg  h-14 items-center bg-stone-800 " >
                <h1  className=" animation text-2xl text-slate-200 font-mono m-3 " >Harish Kumar</h1>
                <ul className="flex text-white w-96  text-wrap justify-between m-3   " >
                   <li className=" butt border border-slate-500 rounded-md text-wrap w-14 cursor-pointer hover:bg-slate-500 hover:scale-110   text-center "  > <NavLink   to = "/"  > About</NavLink></li>
                    <li className=" butt border border-slate-500 rounded-md text-wrap w-16 text-center cursor-pointer hover:bg-slate-500 hover:scale-110 " ><NavLink    to={"/Contact"} >Contact</NavLink></li>
                    
                    
                    <li className=" butt border border-slate-500 rounded-md text-wrap w-28 text-center cursor-pointer hover:bg-slate-500 hover:scale-110 " ><NavLink  to={"product"} >Products</NavLink></li>
                    
                    {  !checkloggedin ?  <li className=" butt border border-slate-500 rounded-md text-wrap w-28 text-center cursor-pointer hover:bg-slate-500 hover:scale-110 " ><NavLink   to={ "/login/signup"} >Login/Signup</NavLink></li>
                        :
                        <li   onClick = {handlemodal}  className="butt border border-slate-500  rounded-md text-wrap w-28 text-center cursor-pointer hover:bg-slate-500 hover:scale-110 " >User</li> 
                    }
                
                    {
                        (modal && checkloggedin  )  && 
                        <main className="  rounded-lg h-auto   border-b-4 border-b-orange-500 absolute z-10 right-0 top-14 m-1   " >
                            <div className="flex flex-col overflow-auto  text-center " >
                                <h1 className=" cursor-pointer rounded-lg  text-cyan-100   border-b-orange-500 border-b-4 p-3" >{ userdata.username || "User Name"  }</h1>
                                <span className= " rounded-lg cursor-pointer text-cyan-100  border-b-orange-500 border-b-4 p-3" >{ userdata.email || "User Email" }</span>
                                <span onClick={hadnlelogout}  className="p-3  cursor-pointer text-cyan-100"  >Logout</span>
                            </div>
                        </main>
                    
                    }
                </ul>
            </header>
        </nav>
    )
}

export default Navbar;