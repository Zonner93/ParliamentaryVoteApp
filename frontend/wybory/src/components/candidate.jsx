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
            <button onClick={function(){
                props.delete(props.id)
            }
            }> Usuń Kandydata</button>
        </div>
    </>
)
}


export default Candidate;