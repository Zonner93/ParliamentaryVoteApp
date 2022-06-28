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
import './getOneElection.css';



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
        setOneElection(function(){
            
            let election = Object.create(response.data);
            election.id = response.data.id;
            election.name = response.data.name;
            election.description = response.data.description;
            election.candidateList = response.data.candidateList;
            election.startDate = response.data.startDate.replace("T"," ");
            election.endDate = response.data.endDate.replace("T"," ");
            return election
        })
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
        if(candidate) {
            return [
                ...prevValue,
                candidate]

        }
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
        NotificationManager.success("Pomyślnie usunięto kandydata z głosowania.")
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
    debugger
    axios({
        method: 'POST',
        url: 'http://localhost:8080/api/candidates/vote/'+id,
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){
        NotificationManager.success("Pomyślnie oddano głos.")
        }).catch(function(err){
            if(err.response.status == 400) {
                NotificationManager.error("W tym głosowaniu oddano już głos.")
            } else {

                NotificationManager.error(err.message)
            }
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
    <div className="wrapperElection">
    <h1>{oneElection.name}</h1>
    <p>ID:{oneElection.id}</p>
    <p>Data rozpoczęcia : {oneElection.startDate}</p>
    <p>Data zakończenia : {oneElection.endDate}</p>
    <p>Opis : {oneElection.description}</p>

    <div className="controller">
    { sessionStorage.role === "ROLE_ADMIN" ? <>

    <EditElectionModal variant='contained' refresh={getOneElection} electionInfoData ={oneElection} updateElectionInfo={updateElectionInfo}/>
    <AddCandidateModal refresh = {getOneElection} id={oneElection.id} changeCandList={changeCandList}/>
    <div>
    <Button variant='contained' onClick={function(event){
        deleteElection(oneElection.id)
        event.preventDefault();
    }
    }> Usuń głosowanie</Button>
    </div>
    
    </>
    : null }
    </div>
    </div>


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
