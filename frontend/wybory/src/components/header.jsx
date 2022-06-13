import React from "react";
import {useNavigate } from "react-router-dom"
import UserLogIn from './userLogIn.jsx'
import './header.css'


function Header(){


return(
    <div className="header">
    <img className="mainLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Europarl_logo.svg/800px-Europarl_logo.svg.png" />
    <h1 className="mainTitle">Wybory Parlamentarne</h1>
    <UserLogIn />
    </div>
)

}


export default Header;