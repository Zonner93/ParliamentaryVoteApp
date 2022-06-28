import React, {useEffect, useState} from 'react';
import Candidate from "../candidate.jsx"
import axios from "axios"
import DeleteCandidate from './deleteCandidate.js';
import './listCandidates.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CryptoJS from 'crypto-js';



function GetAllCandidates(props) {


const[allCandidates, setAllCandidates] = useState([])

function getAllCandidates(){
	axios({
		method:'get',
		url: 'http://localhost:8080/api/candidates/all',
		auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
		// url: 'http://localhost:8080/login'
	}).then(function(response) {
		
			setAllCandidates(response.data)
	}
		);
}

useEffect(function(){getAllCandidates()}, [])


// Delete Candidate -----------------------------------------
function deleteCandidate(id, candidateProps){
	axios({
		method:'delete',
		url: 'http://localhost:8080/api/candidates/'+id,
		auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
		}).then(function(response) {
			NotificationManager.success( "Pomyślnie usunięto kandydata")
			getAllCandidates()
			}
		).catch(function(err){
			if(err.response.status === 0){
			NotificationManager.error("Błąd sieci. " + err.message)
		} else if(candidateProps.electionId !== 0){
			NotificationManager.error("Nie można usunąć.\n Kandydat przypisany do elekcji.")
		}else{
			NotificationManager.error(err.message)
		}
		})
}
// Delete Candidate -----------------------------------------



function updateCandidate(data){
	getAllCandidates();
}

return (

	<div class="container">
	<ul class="responsive-table">
	  <li class="table-header">
		<div class="col col-1">ID</div>
		<div class="col col-2">Imię</div>
		<div class="col col-3">Nazwisko</div>
		<div class="col col-4">Partia</div>
		<div class="col col-5"></div>
	  </li>
	{
		allCandidates.map(function (singleCandidate) {
		return (
			<Candidate
			key={singleCandidate.id}
			id={singleCandidate.id}
			electionId={singleCandidate.electionId}
			firstName={singleCandidate.firstName}
			lastName={singleCandidate.lastName}
			email={singleCandidate.email}
			politicalGroup={singleCandidate.politicalGroup}
			icon='bin'
			action={deleteCandidate}
			editPossibility={props.editPossibility}
			updateCandidate={updateCandidate}
		/>)})

	}

	</ul>
</div>
	)

};

export default GetAllCandidates;