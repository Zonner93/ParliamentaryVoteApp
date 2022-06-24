import React, {useState} from "react";
import axios from "axios";
import {Navigate, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NotificationManager } from "react-notifications";


function CreateElection() {

var today = new Date();
var date = today.toISOString().split('T')[0]


const navigate = useNavigate();

const[electionDataInput, setElectionDataInput] = useState({
    "startDate":date,
    "endDate": date,
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
        data: {    
        "startDate":newElection.startDate + ' 12:00:00',
        "endDate": newElection.endDate + ' 12:00:00',
        "name": newElection.name,
        "description": newElection.description},
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){
        NotificationManager.success("Pomyślnie utworzono głosowanie")
        navigate('/allelections')
    }).catch(function(err){
        NotificationManager.error(err.message)
    })
}

    return(<>

            <TextField name ="name" id="standard-basic" label="Nazwa" variant="standard" value={electionDataInput.name} onChange={handleChange} />
            <TextField type="date" name ="startDate" id="standard-basic" label="Data rozpoczęcia" variant="standard" value={electionDataInput.startDate} onChange={handleChange}/>
            <TextField type="date" name ="endDate" id="standard-basic" label="Data zakończenia" variant="standard" value={electionDataInput.endDate} onChange={handleChange}/>
            <TextField name ="description" id="standard-basic" label="Opis" variant="standard" value={electionDataInput.description} onChange={handleChange}/>
            <Button onClick={function(event){
               createElection(electionDataInput)
               event.preventDefault()
               }
               }> Utwórz głosowanie</Button>
        </>
    )
}


export default CreateElection;