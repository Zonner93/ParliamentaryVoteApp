
    import React from "react";
    import {useNavigate } from "react-router-dom"
    import MenuItem from './menuItem'
    import './navbar.css'
    

function NavbarUser(){


 const navigate = useNavigate();

    function goToPath(route) {
        console.log(route)
        navigate(route);

    }
 
        return(
            <div className="navbar">
            <ul>

                 <MenuItem
                    name="Wyświetl aktywne głosowania"
                    route="/user/allelections/active"
                    goTo={goToPath}
                />
                <MenuItem
                    name="Zobacz wyniki wszystkich głosowań"
                    route="/user/allelections/finished"
                    goTo={goToPath}
                />

                {/* <MenuItem
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
                /> */}
            </ul>
        </div>
        )
    }
    



export default NavbarUser