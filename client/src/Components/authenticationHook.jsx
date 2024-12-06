import { useState, useEffect, useDebugValue } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [userObj, setUserObj] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch("/session", {credentials: "include"});
            const resData = await response.json();
            if (resData.auth) {
                setUserObj(resData.user);
            }
            else {
                setUserObj(null);
                navigate("/");
            }
        };
        fetchSession();
    }, []);
    return { userObj };
};