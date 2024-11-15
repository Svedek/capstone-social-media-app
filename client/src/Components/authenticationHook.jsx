import { useState, useEffect, useDebugValue } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch("./session", {credentials: "include"});
            const resData = await response.json();
            if (resData.auth) {
                setUserId(resData.user.id);
            }
            else {
                setUserId(null);
                navigate("/");
            }
        };
        fetchSession();
    }, []);
    return { userId };
};