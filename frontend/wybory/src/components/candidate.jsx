import React from "react";
import "./pages/listCandidates.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCandidateModal from "./addCandidateModal";
import EditCandidateModal from "./editCandidateModal";
import "./candidate.css"

function Candidate(props) {

function createEditBtn () {
    if (props.editPossibility) {
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
}

function displayIcon(){
    let x;
    if(props.voteResult != undefined) {
        x = props.voteResult(props.id);
    }
    if(sessionStorage.role === "ROLE_ADMIN"){
        return props.icon === 'bin' ? <DeleteIcon/> : <AddIcon />
    } else {
        if(x != undefined) {
            return (<p>{x}</p>)
        } else {
            return props.icon === 'bin' ? <p>głosuj</p> : null
        }
    }

}
const a = true

return (

    <li className="table-row">
      <div className="col col-1" data-label="Job Id" title={props.id}>{props.id}</div>
      <div className="col col-2" data-label="Customer Name"title={props.firstName}>   {props.firstName}</div>
      <div className="col col-3" data-label="Amount" title={props.lastName}>{props.lastName}</div>
      <div className="col col-4" data-label="Payment Status" title={props.politicalGroup}>{props.politicalGroup}</div>
      <div className="col col-5 button"><a onClick={function(){
                props.action(props.id, props)
            }
            }>{displayIcon()}</a>
        {createEditBtn()}
        </div>

    </li>

)
}


export default Candidate;