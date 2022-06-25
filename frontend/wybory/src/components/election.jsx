import React from "react";


function Election(props) {

    return(
            <li class="table-row">
                <div class="col col-1" data-label="Job Id">{props.id}</div>
                <div class="col col-2" data-label="Customer Name">{props.name}</div>
                <div class="col col-3" data-label="Amount">{props.startDate.replace('T', " ")}</div>
                <div class="col col-4" data-label="Payment Status">{props.endDate.replace('T', " ")}</div>
                <div class="col col-5 button" onClick={function(event){
                            props.details(props.id)
                            event.preventDefault();
                        }}> Szczegóły
                    </div>
                </li>
    )
}

export default Election;
