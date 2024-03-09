import { Fragment } from "react";
import ListItems from "./listitems";
import { useAuth } from "./context";
const Product = () =>{
   const {products} = useAuth();


   


    return(
        <Fragment>

        <main className="grid grid-cols-4" >       
            {
                products.map(elem => <ListItems key={elem._id} data = {elem}  /> )
            }
        </main>

        </Fragment>
    )
}

export default Product;