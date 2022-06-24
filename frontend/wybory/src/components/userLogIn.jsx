import React from "react";
import './header.css'
import {useNavigate } from "react-router-dom"




function UserLogIn () {

const navigate = useNavigate();

async function logout(){
   await sessionStorage.clear()
    await navigate('/')
     window.location.reload(false);

}


    return(
        <>
            <p onClick={function(event){
                event.preventDefault()
                 logout()
             }}
             className="userLogin">Wyloguj</p>
        </>
    )

}




export default UserLogIn;