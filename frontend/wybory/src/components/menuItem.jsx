import React from "react"
import ReactDOM from "react-dom"
import './menuItem.css'

function MenuItem(props){


    return(
        <>
            <div className="box"> 
            <button onClick={function(event){
                props.goTo(props.route)}
                }>{props.name}</button>
            </div>
        </>

    );
}




export default MenuItem;