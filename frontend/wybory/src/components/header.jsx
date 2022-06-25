import React from "react";
import {useNavigate, } from "react-router-dom"
import UserLogIn from './userLogIn.jsx'
import './header.css'


function Header(){

    const navigate = useNavigate()

return(
    <div className="header">
    <img className="mainLogo" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Godlo_Polski_oficjalne_male.png" onClick={() => {navigate('/'); window.location.reload(false)}} />
    <h1 className="mainTitle">Wybory Parlamentarne</h1>
    <UserLogIn />
    </div>
)

}


export default Header;