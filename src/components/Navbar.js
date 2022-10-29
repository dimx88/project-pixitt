import { Link } from "react-router-dom";

// Styles
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <span>(img)</span>
                <span className="logo-text">Pixitt</span>
            </div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>
    );
}