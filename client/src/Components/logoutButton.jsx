import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch("./logout", {
            method: "POST"
        });
        navigate("/");
    }
    return <p className="logout" onClick={handleLogout}>Logout</p>
}

export default LogoutButton;