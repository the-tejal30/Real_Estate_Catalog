import React from "react";
import { Navigate ,Outlet } from "react-router-dom";

const PrivateComponent=()=>{
    
    const auth=true
    return(
        auth?<Outlet/>:<Navigate to="/"/>

    )
}
export default PrivateComponent;