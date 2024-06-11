import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.handleLogout()
        window.location.reload()
        navigate("/", { state: "you have been logged out" })
    }

    const isLoggedIn = auth.user !== null;

    return isLoggedIn ? (
        <div>
            <div>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    ) : null
};

export default Logout;
