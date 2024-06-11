import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentails, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Log In successfully", "success");
            history('/');
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentails, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-3'>
            <h3>Login to use iNoteBook</h3>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentails.emailemail} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentails.password} onChange={onChange} id="password" name='password' required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;