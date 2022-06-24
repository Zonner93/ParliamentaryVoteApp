import axios from "axios";
import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';

import {useNavigate} from "react-router-dom"
import Candidate from "../candidate.jsx";
import Modal from  "react-modal"
import { useParams } from 'react-router-dom';
import './listCandidates.css'
import AddCandidateModal from "../addCandidateModal.jsx";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import EditElectionModal from "../editElectionModal.jsx";



function GetOneElection(){

const navigate = useNavigate();
let {electionID} = useParams();

const[oneElection, setOneElection] = useState([])
const[candList,setCandList] = useState([])

useEffect(function(){getOneElection()},[])

function getOneElection(){
    axios({
        method:'get',
        url:'http://localhost:8080/api/elections/'+electionID,
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){
        setOneElection(response.data)
        setCandList(response.data.candidateList)
    }).catch(function(err){
        NotificationManager.error(err.message)
    })
}


 function deleteElection(electionId){
   axios({
        method:'delete',
        url:'http://localhost:8080/api/elections/'+electionID,
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){
        NotificationManager.success("Pomyślnie usunięto głosowanie")
        navigate('/allelections')
    }).catch(function(err){
        NotificationManager.error(err.message)
    })
}

function changeCandList(candidate) {
    setCandList(function(prevValue) {
        if(candidate)
        return [
            ...prevValue,
            candidate]
    })
}

function deleteFromList(id) {
    axios({
        method:'patch',
        url: 'http://localhost:8080/api/elections/'+electionID+'/remove-candidate?candidateId='+id,
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    })
   .then(function(response) {
        NotificationManager.success(response.status + "Pomyślnie usunięto kandydata")
        getOneElection();
    })
    .catch(function(err){
            NotificationManager.error(err.message)
    })
    // window.location.reload(false);
}

function updateElectionInfo(){
    getOneElection();
}

function voteForCandidate(id){

    axios({
        method: 'POST',
        url: 'http://localhost:8080/api/candidates/vote/'+id,
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){
        NotificationManager.success("Pomyślnie oddano głos")
        }).catch(function(err){
            NotificationManager.error(err.message)
        })

}

function action(){
    if(sessionStorage.role === "ROLE_ADMIN"){
       return deleteFromList
    }else {
        return voteForCandidate
    }
}

    return  (<>
    <p>ID:{oneElection.id}</p>
    <p>Nazwa : {oneElection.name}</p>
    <p>Data rozpoczęcia : {oneElection.startDate}</p>
    <p>Data zakończenia : {oneElection.endDate}</p>
    <p>Opis : {oneElection.description}</p>


    { sessionStorage.role === "ROLE_ADMIN" ? <>

    <EditElectionModal electionInfoData ={oneElection} updateElectionInfo={updateElectionInfo}/>
    <Button variant='outlined' onClick={function(event){
        deleteElection(oneElection.id)
        event.preventDefault();
    }
    }> Usuń głosowanie</Button>
    <AddCandidateModal id={oneElection.id} changeCandList={changeCandList}/>
    </>
    : null }




    <p>Lista kandydatów:</p>
    <div className="container">
        <ul className="responsive-table">
            <li className="table-header">
            <div className="col col-1">ID</div>
            <div className="col col-2">Imię</div>
            <div className="col col-3">Nazwisko</div>
            <div className="col col-4">Partia</div>
            <div className="col col-5"></div>
        </li>
            {
                candList.map(function (singleCandidate) {
                    return <Candidate

                        key={singleCandidate.id}
                        id={singleCandidate.id}
                        firstName={singleCandidate.firstName}
                        lastName={singleCandidate.lastName}
                        politicalGroup={singleCandidate.politicalGroup}
                        icon='bin'
                        action={action()}
                        buttonName='Usuń kandydata z listy'
                        />
                    })
            }
        </ul>
    </div>
    </>)

}


export default GetOneElection;




// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import axios from "axios";
// import React, {useState, useEffect} from "react";
// import {useNavigate } from "react-router-dom"
// import Election from "../election.jsx";





// function VoteResults() {

//     function getResults(){
//     axios({
//         method:'get',
//         url:'http://localhost:8080/api/elections/vote-results/16',
//         auth: {
// 			username: sessionStorage.email,
// 			password: sessionStorage.password
// 		  }
//         // auth: {
// 		// 	username: 'admin@gmail.com',
// 		// 	password: "admin123"
// 		//   }
//     }).then(function(response){
//         console.log(response)
    
//     }).catch(function(err){
//         NotificationManager.error(err.message)
//     })
// }

//     useEffect(function(){getResults()},[])




//     const navigate = useNavigate();

// function getAllElections(){
//     axios({
//         method:'get',
//         url:'http://localhost:8080/api/elections/all',
//         auth: {
// 			username: sessionStorage.email,
// 			password: sessionStorage.password
// 		  }
//     }).then(function(response){setAllElections(response.data)})
// }

// const[allElections, setAllElections] = useState([])

// useEffect(function(){getAllElections()},[])

// function showDetails(electionId){
//     navigate('/elections/'+electionId)
// }

//     return(

//         <div class="container">
//         <ul class="responsive-table">
//           <li class="table-header">
//             <div class="col col-1">ID</div>
//             <div class="col col-2">Nazwa</div>
//             <div class="col col-3">Data rozpoczęcia</div>
//             <div class="col col-4">Data zakończenia</div>
//             <div class="col col-5"></div>
//           </li>
//           {
//             allElections.map(function(singleElection){

//                 return <Election
//                     key={singleElection.id}
//                     id={singleElection.id}
//                     startDate={singleElection.startDate.slice(0,10)}
//                     endDate={singleElection.endDate.slice(0,10)}
//                     name={singleElection.name}
//                     details={showDetails}
//                 />
//             })
//         }
//         </ul>
//     </div>
//     )
// }




// export default VoteResults;