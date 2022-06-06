import React, {useEffect, useState} from 'react';
import Candidate from "../candidate.jsx"
import axios from "axios"

const kandydaci = [
	{	"id" : "1",
		"name": "Jarek",
		"surname": "Tusk",
		"email": "jarek.tusk@gmail.com",
		"password": "duparomana123",
		"politicalGroup": "PIS"
	},
	{	"id" : "2",
		"name": "Jwearek",
		"surname": "Tweweusk",
		"email": "jarek.tweqwusk@gmail.com",
		"password": "duparomaqwewqena123",
		"politicalGroup": "PIqwewS"
	}
]

function GetAllCandidates() {

let candidatesFromAPI

useEffect(function(){
	axios({method:'get',
	headers: { 'Content-Type': 'application/json'},
	url: 'http://localhost:8080/api/candidates/2'
	})
		.then( function(response) {
			console.log(response)
			candidatesFromAPI = response.data
			// setAllCandidates([candidatesFromAPI])
			}
		);
}, [])



const[allCandidates, setAllCandidates] = useState(kandydaci)



return (
	<>
{
	allCandidates.map(function(singleCandidate) {
		return ( <Candidate
			key={singleCandidate.id}
			id={singleCandidate.id}
			name={singleCandidate.name}
			surname={singleCandidate.surname}
			email={singleCandidate.email}
			politicalGroup={singleCandidate.politicalGroup}
		/> )
	})
}
	</>
);

};

export default GetAllCandidates;
