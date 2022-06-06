import React from "react";

function Candidate(props) {

return (
    <>
        <div>
            <p>ID:{props.id}</p>
            <p>Imię : {props.name}</p>
            <p>Nazwisko : {props.surname}</p>
            <p>Email : {props.email}</p>
            <p>Partia : {props.politicalGroup}</p>
        </div>
    </>
)
}


export default Candidate;