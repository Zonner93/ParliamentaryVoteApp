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
        url:'http://localhost:8080/api/elections/'+electionID
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
        url:'http://localhost:8080/api/elections/'+electionID
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
        url: 'http://localhost:8080/api/elections/'+electionID+'/remove-candidate?candidateId='+id
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

    return  (<>
    <p>ID:{oneElection.id}</p>
    <p>Nazwa : {oneElection.name}</p>
    <p>Data rozpoczęcia : {oneElection.startDate}</p>
    <p>Data zakończenia : {oneElection.endDate}</p>
    <p>Opis : {oneElection.description}</p>

    <EditElectionModal electionInfoData ={oneElection} updateElectionInfo={updateElectionInfo}/>
    <Button variant='outlined' onClick={function(event){
        deleteElection(oneElection.id)
        event.preventDefault();
    }
    }> Usuń głosowanie</Button>
    <AddCandidateModal id={oneElection.id} changeCandList={changeCandList}/>

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
                        action={deleteFromList}
                        buttonName='Usuń kandydata z listy'
                        />
                    })
            }
        </ul>
    </div>
    </>)

}


export default GetOneElection;




// function renderDisplayMode(){
//     return(
//         <>
//                     <p>ID:{oneElection.id}</p>
//                     <p>Nazwa : {oneElection.name}</p>
//                     <p>Data rozpoczęcia : {oneElection.startDate}</p>
//                     <p>Data zakończenia : {oneElection.endDate}</p>
//                     <p>Opis : {oneElection.description}</p>


//                     {/* <Button variant='outlined'onClick={function(event){
//                         toggleEditMode()
//                         event.preventDefault();
//                     }
//                     }> Edytuj głosowanie</Button> */}

//                     <EditElectionModal />

//                     <Button variant='outlined' onClick={function(event){
//                         deleteElection(oneElection.id)
//                         event.preventDefault();
//                     }
//                     }> Usuń głosowanie</Button>

//                     <AddCandidateModal id={oneElection.id} changeCandList={changeCandList}/>
//         </>

//     )
// }

// function renderEditMode(){
//     return (
//         <>
//                      <p>ID:{oneElection.id}</p>

//                     <label>Nazwa : </label>
//                     <input name='name' value={oneElection.name} onChange={handleChange}/>

//                     <label>Nazwa : </label>
//                     <input name='startDate' type = 'date' value={oneElection.startDate} onChange={handleChange}/>

//                     <label>Nazwa : </label>
//                     <input name='endDate' type = 'date' value={oneElection.endDate} onChange={handleChange}/>

//                     <label>Opis </label>
//                     <input name='description' value={oneElection.description} onChange={handleChange}/>



//                     <button onClick={function(event){

//                         editElection(oneElection.id)
//                         event.preventDefault();
//                     }}> Zapisz Zmiany</button>

//                      <button onClick={function(event){
//                        toggleEditMode()
//                         event.preventDefault();
//                         }}> Anuluj</button>
//             </>

//     )
// }
