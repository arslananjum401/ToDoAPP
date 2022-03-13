import React, { } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
    const Navigate = useNavigate();
    const token = localStorage.getItem("Token")
    const DeleteToken = () => {
        localStorage.clear()
        Navigate('/')
    }
    return (
        <>
            <nav>
                {token && <NavLink className={(status) => 'navbar_Btn' + (status.isActive ? ' Nav_Btn_selected' : '')} to='/' >
                    Home
                </NavLink>
                }
                {!token && < NavLink className={(status) => 'navbar_Btn' + (status.isActive ? ' Nav_Btn_selected' : '')} to='/Register' >
                    Register
                </NavLink>
                }
                {!token && <NavLink className={(status) => 'navbar_Btn' + (status.isActive ? ' Nav_Btn_selected' : '')} to='/login' >
                    Login
                </NavLink>}

                {token && <button onClick={DeleteToken}>Logout</button>}
            </nav>

        </>
    )
}

export default Navbar