import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        setError('');

        // if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
        //     setError('Add uppercase');
        //     return
        // } 
        // else if (!/(?=.*[!@#$&*])/.test(password)) 
        // {
        //     setError('Add a special character');
        //     return
        // }

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser)
            setSuccess('logged in successfully')
            setError('')
        })
        .catch(error=>{
            setError(error.message)
        })
    }

    const handleResetPassword = event =>{
        const email = (emailRef.current.value)
        if(!email){
            alert('Please provide email to reset')
        }
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert("check mail")
        })
        .catch(error=>{
            setError(error.message)
        })
    }
    return (
        <div>
            <h3 className='text-center'>Login</h3>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" ref={emailRef} required name='email' className="form-control" id="email" placeholder="Enter email" />
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
            <p><small>New? Please <Link to="/register">Register</Link></small></p>
            <p><small>Forget Password? <button onClick={handleResetPassword} className='btn btn-link'>Reset</button></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;