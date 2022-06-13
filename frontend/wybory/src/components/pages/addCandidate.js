import React, {useState} from 'react';
import axios from 'axios';
import './addCandidate.css'

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


function addCandidate(newCandidateData){
	console.log(newCandidateData)  /// object Object!
	axios({
		method:'post',
		url:'http://localhost:8080/api/candidates',
		data: newCandidateData
	})
	console.log(newCandidateData)  /// object Object!
	}




return (
	<div className='wrapper'>
	<div className='addCandidate'>
	<h1>Dodaj kandydata</h1>
		<form>
			<label>Imię:</label>
  			<input name="firstName" value={newCandidateData.firstName} onChange={handleChange} />
			<label>Nazwisko:</label>
  			<input name="lastName" value={newCandidateData.lastName} onChange={handleChange}/>
			<label>Partia:</label>
  			<input name="politicalGroup" value={newCandidateData.politicalGroup} onChange={handleChange}/>

			<button type="submit" onClick={function(event){
				addCandidate(newCandidateData)
				setNewCandidateData({
					firstName : "",
					lastName : "",
					politicalGroup : ""
				})
				event.preventDefault()
			}}>Dodaj kandydata </button>
		</form>
	</div>

	</div>
);
};

export default AddCandidate;
