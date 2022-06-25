import React, {useState, useEffect} from "react";
import './header.css'
import {useNavigate } from "react-router-dom"




function UserLogIn () {

const navigate = useNavigate();

const[visible, setVisible]=useState(false)

useEffect(function(){setVisible(false)},[])

async function logout(){
   await sessionStorage.clear()
    await navigate('/')
     window.location.reload(false);
}

    function login(){
         navigate('/login')
         setVisible(true)
 }


    return(
        <> {
            sessionStorage.password ?
            <div className="userLogin">
            <p className="userName">{sessionStorage.name + ' ' + sessionStorage.surname}</p>
            <p className="userLoginBtn" onClick={function(event){
                event.preventDefault()
                 logout()
             }}
             >Wyloguj</p></div>
             : visible ? <div className="userLogin"></div> : <p onClick={function(event){
                event.preventDefault()
                 login()
             }}
             className="userLogin userLoginBtn">Zaloguj</p>
        }
        </>
    )

}




export default UserLogIn;