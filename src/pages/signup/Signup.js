// Hooks
import { useState } from 'react';

// Styles
import './Signup.css';


export default function Signup() {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, displayName);
    };

    return (
        <div className="signup">
            <div className="container">
                <form onSubmit={onSubmit}>
                    <h1>Signup</h1>
                    <label>
                        <span>Email</span>
                        <input type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>
                    <label>
                        <span>Display Name</span>
                        <input type="text"
                            required
                            onChange={(e) => setDisplayName(e.target.value)}
                            value={displayName}
                        />
                    </label>
                    <button className="btn">Sign Up</button>
                </form>
            </div>

        </div>
    );
}