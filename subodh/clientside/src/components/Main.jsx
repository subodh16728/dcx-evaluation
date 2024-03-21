import { Outlet } from 'react-router-dom';
import { userDetails } from '../store/slice/userDetailsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookie from "js-cookie"

const Main = () => {

    const dispatch = useDispatch()

    const token = Cookie.get("token")
    const fetchUserDetails = async () => {
        const response = await dispatch(userDetails())

    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}

export default Main