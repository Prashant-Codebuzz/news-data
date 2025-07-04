import React, { useEffect } from 'react'
import Home from './Home'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Defult = () => {

    const { pathname } = useLocation();
    console.log(pathname);

    const navigate = useNavigate();

    useEffect(() => {
        if (pathname === "/") {
            navigate("/newsdata")
        }
    }, [pathname])
    return (
        <div>
            <Home />
            <Outlet />
        </div>
    )
}

export default Defult
