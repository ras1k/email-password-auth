import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';

const Register = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const auth = getAuth(app);
    

    const handleSubmit = (event) =>{
        event.preventDefault();
        setSuccess('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            event.target.reset();
            setSuccess('User created successfully')
        })
        .catch(error=>{
            setError(error.message)
            console.log(error)
        })
    }
    const handleEmailChange = (event) =>{
        console.log(event.target.value)
        setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) =>{
        console.log(event.target.value)
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" onChange={handleEmailChange} required name="email" id="email" placeholder='Your Email' />
                <br />
                <input type="password" onBlur={handlePasswordBlur} required name="password" id="password" placeholder='Password' />
                <br />
                <input type="submit" value="Register" />
            </form>
            <p className='text-danger'>{error}</p>
            <p className="text-success">{success}</p>
        </div>
    );
};

export default Register;