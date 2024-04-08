
import { Outlet } from "react-router-dom";
import { fetchUserDetails } from "../store/slice/getUserslice";
import { useAppDispatch } from "../store/slice/hooks";

const Main = () => {

    let userID = localStorage.getItem("userId");

    const dispatch = useAppDispatch();
    if (userID){
        dispatch(fetchUserDetails(userID));
    }

    return (

        <Outlet/>
        
    );
}

export default Main;