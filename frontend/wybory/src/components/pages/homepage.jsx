import React, { useCallback } from "react";

import {useNavigate } from "react-router-dom"




function HomePage() {

    const navigate = useNavigate();

    return(
        <>
        <p> coś tu wpisac</p>
        {!sessionStorage.role
        ?
        <button onClick={function(event){
            event.preventDefault();
            navigate('/login')
        }}> Login</button>
        : null
        }
        
        </>
    )
}





export default HomePage