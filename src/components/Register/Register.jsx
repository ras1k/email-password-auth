import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const auth = getAuth(app);
    

    const handleSubmit = (event) =>{
        event.preventDefault();
        setSuccess('')
        setError('')
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password)
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Add at least 1 uppercase');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            event.target.reset();
            setSuccess('User created successfully')
            sendVerificationEmail(result.user)
            updateUserData(result.user, name)
        })
        .catch(error=>{
            setError(error.message)
            console.log(error)
        })
    }

    const sendVerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result=>{
            alert("Pls verify")
        })
    }

    const updateUserData = (user, name) =>{
        updateProfile(user,{
            displayName: name
        })
        .then(()=>{
            console.log('user name updated')
        })
        .catch(error=>{
            setError(error.message)
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
            <h2 className='text-center'>Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='form-control' type="text" required name="name" id="name" placeholder='Your Name' />
                <br />
                <input className='form-control' type="email" onChange={handleEmailChange} required name="email" id="email" placeholder='Your Email' />
                <br />
                <input className='form-control' type="password" onBlur={handlePasswordBlur} required name="password" id="password" placeholder='Password' />
                <br />
                <input type="submit" className='btn btn-primary' value="Register" />
            </form>
            <p><small>Have an account? Please <Link to="/login">Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className="text-success">{success}</p>
        </div>
    );
};

export default Register;