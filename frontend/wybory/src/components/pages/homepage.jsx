import { render } from "@testing-library/react";
import React, { useCallback } from "react";

import {useNavigate } from "react-router-dom"
import './homepage.css'


function renderHello() {
    return(
        <div className="wrapperHomepage">
        <h1>Inżynieria oprogramowania</h1>
        <h2>Projekt zaliczeniowy</h2>
        <h3>Wybory Parlamentarne</h3>
        <h4>Wykonali:</h4>
        <ul>
            <li>Michał Krezymon</li>
            <li>Michał Marcula</li>
            <li>Adam Pawluczuk</li>
            <li>Kamil Mieczkowski</li>
            <li>Mateusz Zawadzki</li>
            <li>Tomasz Bonisławski</li>
        </ul>
        </div>
    )
}


function HomePage() {

    const navigate = useNavigate();

    return(
        <>
        {renderHello()}
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