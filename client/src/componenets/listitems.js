import { Fragment } from "react";

const ListItems = ({data}) =>{
    
    return(
        <Fragment>
            <main  >
                <section className=" bg-stone-900 border    border-cyan-500 text-center m-5 h-fit w-fit  p-4  rounded-3xl" >
                    <div  className="  shadow-inner border-b-4 shadow-slate-200 w-56 h-56 bg-contain bg-center bg-no-repeat hover:scale-105   mx-4 rounded-lg  "  style={{backgroundImage:`url(${data.image})`}} >
                    
                    </div>
                    <div className="m-1 border-b-4 shadow-inner  text-zinc-400  rounded-xl p-3 flex flex-col " >
                        <span  className=" text-start" > Car:  {data.title}</span>
                        <span className=" text-start"  > Class:  {data.class}</span>
                        <span  className=" text-start"  > Production:  {data.start_production}</span>
                    </div>
                </section>
            </main>
        </Fragment>
    )

}

export default ListItems;