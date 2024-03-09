import gsap from "gsap";
import { useEffect,useRef } from "react";

const { Fragment } = require("react")

const About = () =>{
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();
            tl.from(".animate",{
                opacity:0,
                duration:2,
        
                repeat:Infinity
            })
            tl.to(".animate1",{
                scale:1.3,
               
                repeat:Infinity,
                duration:1.5,
                ease:"bounce.inOut"
            },0.2)
            
        },comp)
        return ()=>ctx.revert();
    },[])

    return(
        <Fragment>
            <main className="h-screen overflow-hidden "  ref={comp} >
                <section  className="grid grid-cols-2  "  >

                    <div className="relative  max-w-xl  left-56  text-slate-300 flex gap-7  justify-center  flex-col   ">
                        <h1 className="font-bold font-mono   text-4xl" >About,</h1>
                        <div className="  font-mono font-semibold text-gray-400 w-96 ">
                            <span className="text-slate-200  font-extrabold text-lg " >Harish Kumar</span>
                            <p>I work as a web developer. I developed the app using MongoDB, React, and animation. I used to try to improve the aesthetics of our website. I picked up react from the GFG and gsap on my own. GFG full stack course is to be thanked. to hone my full stack abilities</p>
                        </div>

                    </div>

                    <div  className= "max-w-fit max-h-fit ">
                        <img className="max-w-sm border rounded-full relative  left-36 top-10 max-h-96 " src="/content/image.jpeg"  alt="noimage"/>
                    </div>
                    
                    <div className=" relative top-20  flex gap-9 left-1/2 ">
                        <img   className=" max-w-lg h-20 animate-spin  "  src="  logo512.png" alt="noimage" />
                        <img className=" animate max-w-lg h-20  rounded-full "  src="/content/gsap.png" alt="noimage"/>
                        <img className="animate1 max-w-lg h-20  rounded-full" src="/content/mongodb-logo.png" alt="noimage"/>
                    </div>
                    <span className=" relative top-44 left-80 text-xl " >#  sonuku98913@gmail.com</span>
                </section>
            </main>
           
        </Fragment>
    )
}

export default About;