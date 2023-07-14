import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Homepage from "../Pages/Homepage";

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"))
    return user
}

const ProtectedRoutes = () => {
    const isAuthorized = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthorized) {
            navigate()
        }
    }, [])
    return isAuthorized ? <Outlet /> : <Homepage />
}

export default ProtectedRoutes