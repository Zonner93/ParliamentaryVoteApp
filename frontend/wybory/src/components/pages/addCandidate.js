import React, {useState} from 'react';

const AddCandidate = () => {

function addCandidate(candidateData){
console.log(candidateData)  /// object Object!
}

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



return (
	<div>
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
);
};

export default AddCandidate;
