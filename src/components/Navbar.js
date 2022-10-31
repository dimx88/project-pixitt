import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';

// Styles
import './Navbar.css';




export default function Navbar() {

    const { logout, isPending, error } = useLogout();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <span className="logo-text">Pixitt</span>
                        <span>(img)</span>
                    </Link>
                </div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
                <button className="btn" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}