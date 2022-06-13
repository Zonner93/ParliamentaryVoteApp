import React, {useState} from "react";
import axios from "axios";
import {Navigate, useNavigate } from "react-router-dom"


function CreateElection() {
const navigate = useNavigate();

const[electionDataInput, setElectionDataInput] = useState({
    "startDate":"",
    "endDate": "",
    "name": "",
    "description": ""
})

function handleChange(event){
    setElectionDataInput(function(prevValue){
        const{name,value} = event.target
        return { ...prevValue, [name]:value }
    })
}

function createElection(newElection) {
    console.log(newElection)
   axios({
        method:"post",
        url: 'http://localhost:8080/api/elections',
        data: newElection
    }).then(
        navigate('/allelections')
    )
}




    return(
        <form>
           <label>Data rozpoczęcia:</label>
           <input type="date" name = "startDate" value={electionDataInput.startDate} onChange={handleChange} />
           <label>Data zakończenia:</label>
           <input type="date" name = "endDate" value={electionDataInput.endDate} onChange={handleChange} />
           <label>Nazwa:</label>
           <input name = "name" value={electionDataInput.name} onChange={handleChange} />
           <label>Opis:</label>
           <input name = "description" value={electionDataInput.description} onChange={handleChange} />
           <button onClick={function(event){
               createElection(electionDataInput)
               event.preventDefault()
               }
               }> Utwórz głosowanie</button>
        </form>
    )
}


export default CreateElection;