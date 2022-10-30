import { Link } from "react-router-dom";

// Styles
import './Navbar.css';




export default function Navbar() {
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
                <button className="btn">Logout</button>
            </div>
        </nav>
    );
}