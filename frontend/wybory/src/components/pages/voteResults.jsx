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



function VoteResults(){

const navigate = useNavigate();
let {electionID} = useParams();

const[oneElection, setOneElection] = useState([])
const[candList,setCandList] = useState([])
const[allVoteResults, setVoteResults] = useState([])

useEffect(function(){getOneElection()},[])
useEffect(function(){voteResults()}, [])


function voteResults(){

    axios({
        method: 'get',
        url: 'http://localhost:8080/api/elections/vote-results/'+electionID,
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){
        console.log(response.data)
        setVoteResults(response.data)
    }).catch(function(err){
        NotificationManager.error(err.message)
    })
}

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

function getVoteResult(id) {
    debugger
    for(const i in allVoteResults){
        if(i == id){
            return allVoteResults[i]
        } else {
            return 0
        }
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
            <div className="col col-5"> Liczba głosów</div>
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
                        voteResult = {getVoteResult}

                        />
                    })
            }
        </ul>
    </div>
    </>)

}


export default VoteResults;
