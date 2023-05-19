import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (event) =>{
        event.preventDefault();
        const name = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, password)
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
                <input type="email" onChange={handleEmailChange} name="email" id="email" placeholder='Your Email' />
                <br />
                <input type="password" onBlur={handlePasswordBlur} name="password" id="password" placeholder='Password' />
                <br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;