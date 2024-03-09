import { Fragment, useState } from "react"
import { useEffect,useRef } from "react";
import gsap from "gsap"
import { useAuth } from "./context";
import Modal from "./modal";

const Contact = () =>{
    const [error,seterror] = useState("Something Wrong");
    const [modal,setmodal] = useState(false);
    const [isuser,setuser] = useState(true);
    const [contact,setcontact] = useState({
        username:"",
        email:"",
        message:"",

    })
    const {userdata} = useAuth();

    if(userdata && isuser){
        setcontact({
            username:userdata.username,
            email:userdata.email,
            message:""
        })
        setuser(false)
    }
    

    const comp = useRef();

    const handleinput = e =>{
        setcontact({
            ...contact,
            [e.target.name]:e.target.value
        })
        
    }

    const formsubmit = e =>{
        e.preventDefault();

        const contactdata = async () =>{


            try{
                
                const response = await fetch("http://localhost:5000/api/contact",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(contact)


                })
                const error = await response.json()
                if(response.ok){
                    setcontact({
                        ...contact,
                        message:""
                    })
                    alert("Submit Successfull")
                }else{
                    const {message} = error;
                    seterror(message)
                    setmodal(true)
                    setTimeout(() => {
                        setmodal(false)
                    }, 4000);
                    
                }
            }catch(err){
                alert("user not exist first you have to login")
            }


        }

        contactdata();



    }

    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();
            tl.from(".animate-img",{
                xPercent:90,
                opacity:0,
                duration:1,
                ease:"back.out"
            })
            .from(".animate-form",{
                xPercent:-90,
                opacity:0,
                duration:1,
            
                ease:"back.out"
            },0)
            

        },comp)

        return () => ctx.revert();
    },[])

    return(
        <Fragment>
            <section ref={comp} className="grid grid-cols-2 overflow-hidden h-screen place-content-center">
                <div className=" animate-img border h-96  bg-cover rounded-full w-96 mx-20 bg-no-repeat " style={{backgroundImage:'url(/content/content.jpg)'}}>
                        
                </div>
                <main className="relative  bottom-10" >
                    <form  onSubmit={formsubmit}  className=" animate-form  flex flex-col  " >
                        <label className="my-10 m-1 mx-3  px-05 text-white "  >Name    <input   className= " bg-transparent   border-b-2 border-b-gray-50 w-full focus:outline-none"  type="text" onChange={handleinput}  name="username"  value={contact.username} placeholder="Enter Name" ></input></label>
                        <label className="  text-white mx-3  " >Email    <input  className="w-full  bg-transparent border-b-2 border-b-gray-50  focus:outline-none"  type="text" name="email" onChange={handleinput} value={contact.email} placeholder="Enter Email"></input></label>
                        <p className="relative top-5 text-center font-bold text-xl text-white " >Contact</p>
                        <input  onChange={handleinput}  className="bg-slate-800 mx-2  text-white  focus:outline-none  pb-24 rounded-xl  relative top-5 h-36  " type="text" name="message" value={contact.message} placeholder="Enter Message"></input>
                        <button className="relative top-10 border w-72 left-52 rounded-xl bg-slate-400 hover:scale-105 hover:bg-slate-200 "  >Submit</button>
                    </form>
                </main>
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
            </section>


        </Fragment>
    )
}

export default Contact