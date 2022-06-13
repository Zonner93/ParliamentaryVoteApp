import React from "react";
import "./pages/listCandidates.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Candidate(props) {

function createEditBtn () {
    if (props.edit)
        return(
            <>
            <span></span>
            <a onClick={function(){
                        props.edit(props.id, props)
                    }
                    }><EditIcon/>
                    </a>
            </>
        )
}

function displayIcon(){
   return props.icon === 'bin' ? <DeleteIcon/> : <AddIcon />
}

return (

    <li class="table-row">
      <div class="col col-1" data-label="Job Id">{props.id}</div>
      <div class="col col-2" data-label="Customer Name">{props.name}</div>
      <div class="col col-3" data-label="Amount">{props.surname}</div>
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