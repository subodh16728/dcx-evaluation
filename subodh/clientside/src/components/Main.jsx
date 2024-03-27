import { useNavigate, Outlet } from 'react-router-dom';
import { userDetails } from '../store/slice/userDetailsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from "../components/Login"
import Cookie from "js-cookie"

const Main = () => {

    const dispatch = useDispatch()
    const token = Cookie.get("token")
    useEffect(() => {
        if (token) {
            fetchUserDetails()
        }
    })

    const fetchUserDetails = async () => {
        await dispatch(userDetails())
    }

    return (
        <>
            {token ? <Outlet /> : <Login />}
        </>
    )
}

export default Main