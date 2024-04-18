import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUserDetails } from "../store/slice/getUserSlice";


const Main=()=>{
    
    const dispatch= useDispatch();
    useEffect(() => {
        const UserId = localStorage.getItem("UserId");
        
       
        dispatch(fetchUserDetails(UserId));
    })
    return(
        <Outlet/>
    )
}
        
export default Main;
