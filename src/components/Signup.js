import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentails, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const { name, password, email } = credentails;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history('/');
            props.showAlert("Signed Up successfully", "success");
        } else {
            props.showAlert("Use proper credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentails, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-3'>
            <h3>Create an account to use iNoteBook</h3>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Enter name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;