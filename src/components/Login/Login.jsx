import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        setError('');

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Add uppercase');
            return
        } 
        else if (!/(?=.*[!@#$&*])/.test(password)) 
        {
            setError('Add a special character');
            return
        }
    }
    return (
        <div>
            <h3 className='text-center'>Login</h3>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" required name='email' className="form-control" id="email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required name='password' className="form-control" id="password" placeholder="Password" />
                </div>

                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Login;