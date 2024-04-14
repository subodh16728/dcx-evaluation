import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import { fetchUserDetails } from "../store/slice/getUserSlice";
import React from "react";
import { useAppDispatch } from "../store/slice/hooks";

const Main=()=>{

    // const [UserId,setUserId]=useState({});
    const dispatch=useAppDispatch();
    useEffect(()=>{
        
        const UserId=localStorage.getItem("userId");
        // setUserId(UserId);
        if(UserId){
            dispatch(fetchUserDetails(UserId));
        }

       
    })
    return(
        <Outlet/>
        
    )

}
export default Main;