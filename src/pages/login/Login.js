// Hooks
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';



// Styles
import './Login.css';


export default function Login() {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, isPending, error} = useLogin();
    
    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);

    };

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>
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
                    {!isPending && <button className="btn">Login</button>} 
                    {isPending && <button className="btn" disabled>Loading...</button>}
                </form>
            </div>

        </div>
    );
}