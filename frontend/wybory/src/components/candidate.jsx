import React from "react";
import "./pages/listCandidates.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCandidateModal from "./addCandidateModal";
import EditCandidateModal from "./editCandidateModal";

function Candidate(props) {

function createEditBtn () {
    if (props.editPossibility)
        return(
            <>
            <span></span>
            <a onClick={function(){
                        // props.edit(props.id, props)
                        console.log(props)
                    }
                    }>
                    {/* <EditIcon/> */}
                    <EditCandidateModal candidateData={props}/>
                    </a>
            </>
        )
}

function displayIcon(){
    if(sessionStorage.role === "ROLE_ADMIN"){
        return props.icon === 'bin' ? <DeleteIcon/> : <AddIcon />
    } else {
        return props.icon === 'bin' ? <p>głosuj</p> : null
    }

}
const a = true

return (

    <li class="table-row">
      <div class="col col-1" data-label="Job Id">{props.id}</div>
      <div class="col col-2" data-label="Customer Name">{props.firstName}</div>
      <div class="col col-3" data-label="Amount">{props.lastName}</div>
      <div class="col col-4" data-label="Payment Status">{props.politicalGroup}</div>
      <div class="col col-5 button"><a onClick={function(){
                props.action(props.id, props)
            }
            }>{displayIcon()}</a>
        {createEditBtn()}
        </div>

    </li>

)
}


export default Candidate;