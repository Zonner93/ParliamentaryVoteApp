import React from "react";
import ReactDOM from "react-dom";
import LoginInput from "../logininput.jsx"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom"


function Login(){
    const navigate = useNavigate();

    function login(loginData){
    console.log(loginData)
    navigate('/start');
}


    return (
<div >
      <LoginInput login={login}/>

</div>

    )
}





export default Login;