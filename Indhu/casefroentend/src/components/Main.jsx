import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import { fetchUserDetails } from "../store/slice/getUserSlice";

const Main=()=>{

    const [UserId,setUserId]=useState({});
    const dispatch=useDispatch();
    useEffect(()=>{
        const UserId=localStorage.getItem("userId");
        setUserId(UserId);

        dispatch(fetchUserDetails(UserId));
    })
    return(
        <Outlet/>
        
    )

}
export default Main;