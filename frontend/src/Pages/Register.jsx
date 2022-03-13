import React, { useState, useContext } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import './Register.css'
import Navbar from '../Components/Navbar';
import { Context } from '../App'
// import axios from 'axios';

const Register = () => {
    const [UserName, getUserName] = useState("");
    const [Password, getPassword] = useState("");
    const [Email, getEmail] = useState("");
    const CToken = localStorage.getItem("Token")
    const [, setCredentials] = useContext(Context)


    const navigate = useNavigate();

    const [Err, getErr] = useState("");
    var ERR;
    const HandleErrs = async (response) => {
        const { message } = await response.json()
        if (!response.ok) {

            ERR = message;

            throw new Error(message)
        }
        return response

    }
    const SendData = async (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/Register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Email,
                    UserName,
                    Password
                })
            })

            .then(HandleErrs)
            .then((res) => {

                setCredentials({
                    UserName,
                    Password
                })
                navigate('/')
            }).then(() => {
                localStorage.removeItem("Token")
            })
            .catch((err) => {
                getErr(ERR);
            })
    }
    if (CToken) {
        return (
            <Navigate to="/" />
        )
    } 
    else{
        return (
            <>
                <Navbar />
                <div className='FormContainer'>
                    <h2>Register if you are new here</h2>
                    <br />
                    <form className='RegisterForm'>
                        {Err && <h3>{Err}</h3>}

                        <input className='RegiterInputs' onChange={(e) => { getEmail(e.target.value) }}
                            type='email'
                            placeholder='Enter Your Email'
                        />
                        <br />
                        <input className='RegiterInputs' onChange={(e) => { getUserName(e.target.value) }}
                            type='text'
                            placeholder='Enter Your Username'
                        />
                        <br />

                        <input className='RegiterInputs' onChange={(e) => { getPassword(e.target.value) }}
                            type="password"
                            placeholder="Enter you Password"
                        />

                        <br />
                        <button type="submit" onClick={SendData}>Register</button>
                    </form>
                </div>
            </>

        )
    }
}

export default Register