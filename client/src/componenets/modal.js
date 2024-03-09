import { Fragment, useEffect, useRef } from "react"
import ReactDOM  from "react-dom";
import gsap from "gsap";
const Modal = ({children}) =>{
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();
            tl.from(".animate-modal",{
                opacity:0,
                xPercent:20,
                duration:0.5,
                ease:"bounce.in"
            })
            .to(".animate-modal",{
                xPercent:10,
                opacity:0,
                duration:1,
                delay:3
            })
            
        },comp)
        return () => ctx.revert();
    },[])

    return(
        <Fragment>
            {
                ReactDOM.createPortal(
                    <main  ref={comp}>
                        <div className="animate-modal" >
                            {children}
                        </div>
                    </main>,
                    document.getElementById("modal-root")
                )
                
            }
        </Fragment>
    )
}


export default Modal;