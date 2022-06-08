import React, {useEffect, useState} from 'react';
import Candidate from "../candidate.jsx"
import axios from "axios"
import DeleteCandidate from './deleteCandidate.js';



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

	allCandidates.map(function (singleCandidate) {
		return <Candidate
			key={singleCandidate.id}
			id={singleCandidate.id}
			name={singleCandidate.firstName}
			surname={singleCandidate.lastName}
			email={singleCandidate.email}
			politicalGroup={singleCandidate.politicalGroup}
			buttonName='usuń kandydata'
			delete={deleteCandidate}
		/>
	})
)

};

export default GetAllCandidates;
