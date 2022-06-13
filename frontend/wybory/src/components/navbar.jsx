import React from "react";
import {useNavigate } from "react-router-dom"
import MenuItem from './menuItem'
import './navbar.css'



function Navbar() {

    const navigate = useNavigate();

    
function goToPath(route) {
	console.log(route)
	navigate(route);

}

    return(
        <div className="navbar">
        <ul>
            <MenuItem
                name="Wyświetl wszystkich kandydatów"
                route="/getallcandidates"
                goTo={goToPath}
            />
            <MenuItem
                name="Dodaj Kandydata"
                route="/addcandidate"
                goTo={goToPath}
            />
            <MenuItem
                name="Wyświetl wszystkie głosowania"
                route="/allelections"
                goTo={goToPath}
            />
            <MenuItem
                name="Utwórz głosowanie"
                route="/createelection"
                goTo={goToPath}
            />
        </ul>
	</div>
    )
}


export default Navbar;