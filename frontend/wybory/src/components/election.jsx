import React from "react";


function Election(props) {



    return(
        <div>
            <p>ID:{props.id}</p>
            <p>Nazwa : {props.name}</p>
            <p>Data rozpoczęcia : {props.startDate}</p>
            <p>Data zakończenia : {props.endDate}</p>
            {/* <p>Opis : {props.description}</p> */}
            <button onClick={function(event){
                props.details(props.id);
                event.preventDefault();
            }
            }> Wyświetl szczegóły...</button>
        </div>
    )
}

export default Election;

// {
    //     "id": 1,
    //     "startDate": "2022-06-07",
    //     "endDate": "2022-06-25",
    //     "name": "Wybory parlamentarne 1",
    //     "description": "jakiś opis wyborów 1",
    //     "candidateList": []
    // },

