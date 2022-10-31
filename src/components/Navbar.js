import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';

// Styles
import './Navbar.css';




export default function Navbar() {

    const { logout, isPending, error } = useLogout();
    const { user } = useAuthContext();

    const nav = useNavigate();

    const handleLogout = async (e) => {
        await logout();
        nav('/');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <ul>
                    <div className="logo">
                        <Link to='/'>
                            <span className="logo-text">Pixitt</span>
                            <span>(img)</span>
                        </Link>
                    </div>
                    {!user &&
                        <>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/signup'>Sign Up</Link></li>
                        </>
                    }

                    {user &&
                        <>
                            {!isPending &&
                                <>
                                    <p>Hi, <strong>{user.displayName}</strong></p> 
                                    <button className="btn" onClick={handleLogout}>Logout</button>
                                </>}
                            {isPending && <button className="btn" disabled>Logout</button>}
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}