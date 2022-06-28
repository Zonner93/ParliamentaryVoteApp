import React, {useState} from 'react';
import axios from 'axios';
import './addCandidate.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Typography from '@mui/material/Typography';


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

// const newC = {
//     "email": "user2@gmail.com",
//     "name": "Jerzy",
//     "surname": "Kowalski",
//     "password": "123456789",
//     "role": "ROLE_USER"
// }

function addCandidate(newCandidateData){
	axios({
		method:'post',
		url:'http://localhost:8080/api/candidates',
		data: newCandidateData,
		auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
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
	<Typography id="modal-modal-title" variant="h4" component="h2">
            Dodaj kandydata
          </Typography>
	<div className='wrapperInputs'>
		<TextField  type="text" name ="firstName" id="standard-basic" label="Imię" variant="standard" value={newCandidateData.firstName} onChange={handleChange}/>
		<TextField  name ="lastName" id="standard-basic" label="Nazwisko" variant="standard" value={newCandidateData.lastName} onChange={handleChange}/>
		<TextField  name ="politicalGroup" id="standard-basic" label="Partia " variant="standard" value={newCandidateData.politicalGroup} onChange={handleChange}/>
		</div>
		<div className='controller'>
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

	</div>
);
};

export default AddCandidate;