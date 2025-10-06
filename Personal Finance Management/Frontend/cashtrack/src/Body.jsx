import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";
import {Route,Routes,Navigate} from "react-router-dom";
import Launchpage from "./Launchpage";
const Body=()=>{
    return(<React.Fragment>
        <Routes>
            
                    <Route path="/" element={<Launchpage/>}></Route>
                    <Route path="/signin" element={<Signin/>}></Route>
                    <Route path="/signup" element={<Signup/>}></Route>
                
                    <Route path="/home/*" element={<Home/>}></Route>
                    <Route path="*" element={<Navigate to="/home/dashboard"/>} />
                
        </Routes>
    </React.Fragment>);
}
export default Body;