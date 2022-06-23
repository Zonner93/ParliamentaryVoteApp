import React, {useState} from 'react';
import axios from 'axios';
import './addCandidate.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const AddCandidate = () => {



const[newCandidateData, setNewCandidateData] = useState({
	firstName : "",
	lastName : "",
	politicalGroup : ""
})



function handleChange(event) {
const{name,value}=event.target;
setNewCandidateData(function(prevValue){
	return {
		...prevValue,
		[name] : value
	}
})
}

const newC = {
    "email": "user2@gmail.com",
    "name": "Jerzy",
    "surname": "Kowalski",
    "password": "123456789",
    "role": "ROLE_USER"
}

function addCandidate(newCandidateData){
	axios({
		method:'post',
		url:'http://localhost:8080/api/users',
		data: newC,
		auth: {
			username: 'admin@gmail.com',
			password: 'admin123'
		  },
	}).then(function(response){
		NotificationManager.success("Pomyślnie dodano nowego kandydata")
	}).catch(
		function(err){
			NotificationManager.error(err.message)
		})
	}




return (
	<div className='wrapper'>
	<div className='addCandidate'>
	<h1>Dodaj kandydata</h1>
		<TextField  type="text" name ="firstName" id="standard-basic" label="Imię" variant="standard" value={newCandidateData.firstName} onChange={handleChange}/>
		<TextField  name ="lastName" id="standard-basic" label="Nazwisko" variant="standard" value={newCandidateData.lastName} onChange={handleChange}/>
		<TextField  name ="politicalGroup" id="standard-basic" label="Partia " variant="standard" value={newCandidateData.politicalGroup} onChange={handleChange}/>
		<Button variant="contained" onClick={function(event){
			addCandidate(newCandidateData)
			setNewCandidateData({
				firstName : "",
				lastName : "",
				politicalGroup : ""
			})
			event.preventDefault()
		}}>Dodaj kandydata </Button>

	</div>

	</div>
);
};

export default AddCandidate;
