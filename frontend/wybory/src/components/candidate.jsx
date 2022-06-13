import React from "react";
import "./pages/listCandidates.css"

function Candidate(props) {



return (

    <li class="table-row">
      <div class="col col-1" data-label="Job Id">{props.id}</div>
      <div class="col col-2" data-label="Customer Name">{props.name}</div>
      <div class="col col-3" data-label="Amount">{props.surname}</div>
      <div class="col col-4" data-label="Payment Status">{props.politicalGroup}</div>
      <div class="col col-5 button"><a onClick={function(){
                props.delete(props.id, props)
            }
            }> {props.buttonName}</a>
        </div>
    </li>

)
}


export default Candidate;


 /* <tr>
            <td>ID:{props.id}</td>
            <td>Imię : {props.name}</td>
            <td>Nazwisko : {props.surname}</td>
            <td>Partia : {props.politicalGroup}</td>
            <button onClick={function(){
                props.delete(props.id)
            }
            }> {props.buttonName}</button>
        </tr> */