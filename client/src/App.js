import LoginAndSignup from "./componenets/Loginsignup";
import Contact from "./componenets/contact";
import About from "./componenets/firstpage";
import Product from "./componenets/products";
import Navbar from "./componenets/topbar";
import Error from "./componenets/error";
import { Route,Routes } from "react-router-dom";
import { useAuth } from "./componenets/context";
import Admin from "./componenets/admin";

const App = () =>{
  const {checkloggedin,userdata} = useAuth();

  return(
    <main>
        <Navbar/>
        
        <Routes>
          <Route path="/" element = {<About/>} ></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          {
            checkloggedin ? "" : 
            <Route path = {"login/signup"} element = {<LoginAndSignup className ="hidden" />}></Route>
          }
          {
            checkloggedin && userdata.isAdmin && <Route path={"/admin"} element = {<Admin/>}  />
          }

          <Route path = "/product" element = {<Product/>}></Route>
         
          <Route path = "/*" element ={<Error/>}></Route>
        </Routes>
    </main>
  )
}

export default App;