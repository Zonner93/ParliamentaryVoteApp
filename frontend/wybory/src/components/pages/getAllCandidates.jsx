import React, {useEffect, useState} from 'react';
import Candidate from "../candidate.jsx"
import axios from "axios"
import DeleteCandidate from './deleteCandidate.js';
import './listCandidates.css'



function GetAllCandidates() {


const[allCandidates, setAllCandidates] = useState([])

function getAllCandidates(){
	axios({
		method:'get',
		url: 'http://localhost:8080/api/candidates/all'
	}).then(function(response) {
			setAllCandidates(response.data)
			console.log(response.data)
			}
		);
}

useEffect(function(){getAllCandidates()}, [])


// Delete Candidate -----------------------------------------
function deleteCandidate(id){
	axios({
		method:'delete',
		url: 'http://localhost:8080/api/candidates/'+id
		}).then(function(response) {
			console.log("Usunięto kandydata")
			getAllCandidates()
			}
		);
}
// Delete Candidate -----------------------------------------

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
			name={singleCandidate.firstName}
			surname={singleCandidate.lastName}
			email={singleCandidate.email}
			politicalGroup={singleCandidate.politicalGroup}
			buttonName='Usuń kandydata'
			delete={deleteCandidate}
		/>)})
	}

	</ul>
</div>
	)

};

export default GetAllCandidates;




// return (

// 	<table>
// 		<thead>
// 			<tr>
// 				<th> ID</th>
// 				<th> Imię</th>
// 				<th> Nazwisko</th>
// 				<th> Partia Polityczna</th>
// 				<th>button</th>
// 			</tr>
// 		</thead>
// 		<tbody>
// {
// allCandidates.map(function (singleCandidate) {
// return (
// 	<Candidate
// 	key={singleCandidate.id}
// 	id={singleCandidate.id}
// 	name={singleCandidate.firstName}
// 	surname={singleCandidate.lastName}
// 	email={singleCandidate.email}
// 	politicalGroup={singleCandidate.politicalGroup}
// 	buttonName='usuń kandydata'
// 	delete={deleteCandidate}
// />)})
// }

// 		</tbody>
// 	</table>
// )
