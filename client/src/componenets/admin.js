import { Fragment, useEffect, useState } from "react";
import { useAuth } from "./context";
import Modal from "./modal";
const Admin = () =>{
    const [edituser,setedituser] = useState({
       
        username:"",
        email:"",
        phone:""
    })
    const [editcontacts,seteditcontacts] = useState({
        username:"",
        email:"",
        message:""
    })
    const [modal,setmodal] = useState(false)
    const [id,setid] = useState("");
    const [editmodal,seteditmodal] = useState(false);
    const {getdata,handleuserbyadmin,UpdateUser} = useAuth();
    const [type,setype] = useState("")
    const [userdata,setuserdata] = useState([]);
    const handleclick  = e =>{
        
        setype(e.target.dataset.id)
    }
    const handleedit = async (e) =>{
        seteditmodal(true)

        const array =  userdata.filter(elem => elem._id === e.target.dataset.id);
        console.log(array);
        type === "users" ? setedituser({
            ...edituser,
            
            username:array[0].username,
            email:array[0].email,
            phone:array[0].phone

        }):seteditcontacts({
            ...editcontacts,
            username:array[0].username,
            email:array[0].email,
            message:array[0].message
        })
        setid(array[0]._id);
        

    }
    const handlesubmit = async (e) =>{
        e.preventDefault();
        
        const answer = await handleuserbyadmin(e.target.dataset.id,type);
        
        if(answer){
            setmodal(true);
            
            setTimeout(() => {
                setmodal(false);
            }, 4000);
        }
    }
    useEffect( ()=>{
      const data = async () =>{
        const userresponse = await getdata(type);
        if(userresponse){
            setuserdata(userresponse)
        }
        return
      }
      data()
    },[type,getdata,handlesubmit,handleedit])
    
    
    const hanldeeditmodal = () =>{
        seteditmodal(prev => !prev)
    }
    
    const handleinput = e =>{
        if(e.target.dataset.id === "users"){
            setedituser({
                ...edituser,
                [e.target.name]:e.target.value
            })
        }else if(e.target.dataset.id === "contacts"){
            seteditcontacts({
                ...editcontacts,
                [e.target.name]:e.target.value
            })
        }
    }

    const submitedit =async () =>{
        const result = await UpdateUser(id,type === "users" ? edituser : editcontacts,type);
        if(result){
            seteditmodal(false)
            setedituser({
                username:"",
                email:"",
                phone:""
            })
            seteditcontacts({
                username:"",
                email:"",
                message:""
                
            })
        }
    }

    return(
        <Fragment>
            <main className=" h-screen  " >
                <section className="flex p-5 justify-around  " >
                    <div className="  p-5 h-96 w-full text-yellow-500 flex flex-col  " >
                        <span className="border my-4 relative top-20 rounded-xl cursor-pointer hover:scale-105 text-center hover:bg-teal-700 "  data-id = {"users"}    onClick={handleclick} >Users</span>
                        <span  className="border  rounded-xl relative cursor-pointer top-20 hover:scale-105 text-center  hover:bg-teal-700 " data-id = {"contacts"} onClick={handleclick} >Contacts</span>
                              
                    </div>
                    <div className="border  w-full" >
                        <h1  className="text-yellow-400 border text-center text-3xl shadow-inner shadow-slate-50 " >{type} Data </h1>
                        <div className=" h-screen   grid grid-cols-3" >
                            {
                                userdata.map(elem => <div key={elem._id} >
                                    <div data-id = {elem._id}    className=" break-words  border-b-2   order-r-2 m-1 rounded-lg  flex flex-col text-slate-200 "  >
                                        <div className="  text-end z-10 flex justify-between  relative" >
                                            <button   data-id = {elem._id} onClick={handleedit}   className="border rounded-lg hover:scale-105" >Edit</button>
                                            <button  data-id = {elem._id}  onClick={handlesubmit}  className="border rounded-lg hover:scale-105  " >Delete</button>
                                        </div>
                                        <span >{elem.username}</span>
                                        <span>{elem.email}</span>
                                        {
                                            type === "users" ? <span>{elem.phone}</span> : <span  >{elem.message}</span>
                                        }
                                    </div>
                                </div>  )


                            }
                        </div>
                    </div>
                   {modal && <Modal>
                    <main className= " animate-modal  absolute w-full  top-20  flex justify-end " >
                        <div className="px-1 w-auto bg-white rounded-lg border py-0.5 text-center " >
                            <span className="text-black" > Delete Successfull </span>
                            <div className="h-1 rounded-b-lg border-b-4  w-full bg-white " ></div>    
                        </div>
                        
                    </main>
                </Modal>}  

                {
                    editmodal && <main className="border left-0 z-10 bg-white p-4 rounded-lg  absolute" >
                        <button onClick={hanldeeditmodal} className=" border-b-2 w-full  " >X</button>
                        <ul className="m-3 p-5" >
                            <li className="border-b-4 p-4 font-bold flex justify-around  relative bottom-5 rounded-xl -my-2" >
                                <span >Name</span>
                                <span>Email</span>
                                {
                                    type === "users" ? <span>Phone</span> : <span>Message</span>
                                }
                            </li>
                            {
                                type === "users" ? <li>
                                    <span className="p-2" ><input  data-id="users" onChange={handleinput}  className="border-y-2 focus:outline-none  border-black rounded-lg" value={ edituser.username   } name="username"  type="string" /></span>
                                    <span className="p-2"><input  data-id="users" onChange={handleinput} className="border-y-2 focus:outline-none border-black rounded-lg" value={ edituser.email } name="email"  type="string" /></span>
                                    <span className="p-2"><input  data-id="users" onChange={handleinput} className="border-y-2 focus:outline-none border-black rounded-lg" value={ edituser.phone} name="phone"   type="string"/></span>
                                    
                                    </li>
                                :   <li >
                                    <span className="p-2" ><input  data-id="contacts" onChange={handleinput}  className="border-y-2 focus:outline-none  border-black rounded-lg" value={ editcontacts.username   } name="username"  type="string" /></span>
                                    <span className="p-2"><input data-id="contacts" onChange={handleinput} className="border-y-2 focus:outline-none border-black rounded-lg" value={ editcontacts.email } name="email"  type="string" /></span>
                                    <span className="p-2"><input data-id="contacts" onChange={handleinput} className="border-y-2 focus:outline-none  border-black rounded-lg  " value={ editcontacts.message} name="message"   type="string"/></span>
                                    
                                    </li>
                                
                            }
                        </ul>
                        <button   onClick={submitedit} className="border hover:bg-red-500 hover:text-white   w-full rounded-lg hover:scale-105 text-center" >Edit </button>
                    </main>
                }  
                </section>
                


            </main>
        </Fragment>
    )
}

export default Admin;