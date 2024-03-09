import { Fragment } from "react"
import {  useNavigate } from "react-router-dom";

const Error = () =>{
    const navigate = useNavigate();
    const  handlenavigate = () =>{
        navigate("/");
    }

    return(
        <Fragment>

            <main  className="h-screen grid place-content-center">
                <p className="text-white  text-9xl left-32 relative bottom-24 " >404</p>
                <p className="relative  bottom-14 font-bold  text-white text-2xl " >OOPS,SORRY WE CAN'T FIND THAT PAGE</p>
                <span className="-my-10  mx-10 text-sm text-yellow-400  " >Either something went wrong or to page doesn't  exist anymore</span>
                <button  className=" border my-10  bg-slate-100 rounded-2xl w-80 mx-20 hover:scale-105 " onClick={handlenavigate}  > About </button>
            </main>




        </Fragment>
    )

}

export default Error;