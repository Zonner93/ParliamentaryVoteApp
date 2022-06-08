import React from "react";


function Election(props) {



    return(
        <div>
            <p>ID:{props.id}</p>
            <p>Nazwa : {props.name}</p>
            <p>Data rozpoczęcia : {props.startDate}</p>
            <p>Data zakończenia : {props.endDate}</p>
            <button onClick={function(event){
                props.details(props.id);
                event.preventDefault();
            }
            }> Wyświetl szczegóły...</button>
        </div>
    )
}

export default Election;
