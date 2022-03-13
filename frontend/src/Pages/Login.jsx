import React, { useState, useContext, } from 'react';
import './Login.css';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Context } from '../App'
// import axios from 'axios';

const Login = () => {
    const CToken = localStorage.getItem("Token");
    const [Email, getEmail] = useState("");
    const [Password, getPassword] = useState("");

    const [, setCredentials] = useContext(Context)

    const navigate = useNavigate();

    const [Err, getErr] = useState("");
    var ERR;

    const HandleErrs = async (response) => {
        var res=await response.json();
        
        const { message, Token,UserName } = res
        if (!response.ok) {

            ERR = message;

            throw new Error(message)
        }
        else if (response.ok) {
            if (Token) {
                localStorage.setItem("Token", Token);
                localStorage.setItem("UserName", UserName);
                // console.log(UserName)
                // console.log(response)
                alert("login Successful");
                navigate('/');
            } else {
                alert("Login again");
                navigate('/login');
            }
        }
        return res

    }
    const SendData = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:4000/Login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Email,
                    Password
                })
            })

            .then(HandleErrs)
            .then((res) => {
                
               return res


            }).then((res)=>{
                const {UserName}=res;
                // console.log(UserName);
                setCredentials({
                    UserName,
                    Email,
                    Password
                })
            })
            .catch((err) => {
                getErr(ERR);
                console.log(err)
            })
    }
    if (CToken) {
        return (
            <Navigate to="/" />
        )
    }
    else {
        return (
            <>
                <Navbar />
                <div className='LoginFormContainer'>
                    {!Err && <h2>Please Enter your E-mail and Password</h2>}
                    <form className='LoginForm' onSubmit={SendData}>
                        {Err && <h3 style={{ color: "Red" }}>{Err}</h3>}

                        <input className='LoginInputs' onChange={(e) => { getEmail(e.target.value) }}
                            type='text'
                            placeholder='Enter Your Email'
                        />
                        <br />

                        <input className='LoginInputs' onChange={(e) => { getPassword(e.target.value) }}
                            type="password"
                            placeholder="Enter you Password"
                        />

                        <br />
                        <button type="submit" >Login</button>
                    </form>
                </div>
            </>

        )
    }
}

export default Login