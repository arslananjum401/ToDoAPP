import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import './Home.css'
import { Context } from '../App'

import ToDoCom from '../Components/ToDoCom'

const Home = () => {
  const [list, getList] = useState([]);
  const populate = async () => {
    await fetch("http://localhost:4000/todo", {
      method: "GET",
      headers: {
        "x-access-token": `${localStorage.getItem("Token")}`
      },
    })
      .then((res) => { return res.json() })
      .then((data) => { getList(data) })


  }
  // populate ()
  var Username = useContext(Context);
  Username = Username[0].UserName;
  var username = localStorage.getItem("UserName")
  const Navigate = useNavigate();

  const token = localStorage.getItem("Token")
  useEffect(() => {
    const Token = localStorage.getItem("Token")


    if (!Token) {
      localStorage.removeItem("Token");
      // Navigate('/login')
    } else if (Token) {
      populate();


    }
  }, []);

  return (
    <>
      <Navbar />

      <div className='HomeContainer'>
      {<h2>welcome {token && (Username || username)}{!token && "Please Register or Login"} </h2>}

        {!token && <NavLink className="HomeBtn" to='/Register'>Register</NavLink>}
        <br />
        {!token && <NavLink className="HomeBtn" to='/login'>Login</NavLink>}

        

        {token && <ToDoCom todoList={list} />}
      </div>
    </>

  )
}

export default Home