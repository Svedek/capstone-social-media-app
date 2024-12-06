import { useNavigate } from "react-router-dom";
import {  LogOut } from 'lucide-react';

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await fetch("./logout", {
            method: "POST"
        });
        navigate("/");
    }
    return <div className="logout link" onClick={handleLogout}><p>Logout</p><LogOut size={24}/></div>
}

export default LogoutButton;