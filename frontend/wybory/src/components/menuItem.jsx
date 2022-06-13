import React from "react"
import './navbar.css'
;

function MenuItem(props){

    return(

        <li>
            <a onClick={function(event){
                props.goTo(props.route)}
                }>
                <span>
                    {props.name}
                </span>
            </a>
        </li> 

    );
}




export default MenuItem;
