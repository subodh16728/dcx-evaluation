
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUserDetails } from "../store/slice/getUserslice";

const Main = () => {

    let userID = localStorage.getItem("userId");

    const dispatch = useDispatch();
    if (userID){
        dispatch(fetchUserDetails(userID));
    }

    return (

        <Outlet/>
        
    );
}

export default Main;