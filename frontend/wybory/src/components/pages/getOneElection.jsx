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



function GetOneElection(){

const navigate = useNavigate();

const[oneElection, setOneElection] = useState([])
const[candList,setCandList] = useState([])
const[editMode, setEditMode]=useState(true)
let {electionID} = useParams();

function toggleEditMode () {
    setEditMode(function(prevValue){
        return !prevValue
    })
}

useEffect(function(){getOneElection()},[])


async function getOneElection(){

   const response = await axios({
        method:'get',
        url:'http://localhost:8080/api/elections/'+electionID
    }).then(function(response){
        setOneElection(response.data)
        setCandList(response.data.candidateList)
    })
    console.log(response)

}


async function deleteElection(electionId){
    console.log("id usun "+  electionId)

   await axios({
        method:'delete',
        url:'http://localhost:8080/api/elections/'+electionID
    })
    navigate('/allelections')
    
}


function editElection(id){
    //post na patch election by id

    axios({
        method: 'patch',
        url:'http://localhost:8080/api/elections/'+id,
        data: oneElection

    })
    toggleEditMode()
    console.log("edited")

    // czy ponowić getOneElection?

}




function assignCandidate(){

}

function changeCandList(candidate) {
    setCandList(function(prevValue) {
        if(candidate)
        return [
            ...prevValue,
            candidate
    ]
    })
}

function deleteFromList (id){


    axios({
        method:'patch',
        url: 'http://localhost:8080/api/elections/'+electionID+'/remove-candidate?candidateId='+id
    })
   .then(function(response){
    NotificationManager.success(response.status + "Pomyślnie usunięto kandydata")
    getOneElection();
    })
    .catch(function(err){
        console.log("weqwe" + err.message)
            NotificationManager.error(err.message)
    })

    // window.location.reload(false);
}

function handleChange(event) {
    const{name,value}=event.target
    //zmieniam ten sam useState - może lepiej zrobic osobny?
    setOneElection(function(prevValue){
        return {
            ...prevValue,
            [name] : value
        }
    })
}



    return  (

                editMode ?
                (<>
                    <p>ID:{oneElection.id}</p>
                    <p>Nazwa : {oneElection.name}</p>
                    <p>Data rozpoczęcia : {oneElection.startDate}</p>
                    <p>Data zakończenia : {oneElection.endDate}</p>
                    <p>Opis : {oneElection.description}</p>


                    <Button variant='outlined'onClick={function(event){
                        toggleEditMode()
                        event.preventDefault();
                    }
                    }> Edytuj głosowanie</Button>

                    <Button variant='outlined' onClick={function(event){
                        deleteElection(oneElection.id)
                        event.preventDefault();
                    }
                    }> Usuń głosowanie</Button>


                    {/* <button onClick={function(event){
                        assignCandidate(oneElection.id)
                        event.preventDefault();
                    }
                    }> Dodaj kandydata do głosowania</button> */}

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
                            name={singleCandidate.firstName}
                            surname={singleCandidate.lastName}
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
                    :
                (<>
                     <p>ID:{oneElection.id}</p>

                    <label>Nazwa : </label>
                    <input name='name' value={oneElection.name} onChange={handleChange}/>

                    <label>Nazwa : </label>
                    <input name='startDate' type = 'date' value={oneElection.startDate} onChange={handleChange}/>

                    <label>Nazwa : </label>
                    <input name='endDate' type = 'date' value={oneElection.endDate} onChange={handleChange}/>

                    <label>Opis </label>
                    <input name='description' value={oneElection.description} onChange={handleChange}/>



                    <button onClick={function(event){

                        editElection(oneElection.id)
                        event.preventDefault();
                    }}> Zapisz Zmiany</button>

                     <button onClick={function(event){
                       toggleEditMode()
                        event.preventDefault();
                        }}> Anuluj</button>


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
                            return (
                                <Candidate
                                key={singleCandidate.id}
                                id={singleCandidate.id}
                                name={singleCandidate.firstName}
                                surname={singleCandidate.lastName}
                                email={singleCandidate.email}
                                politicalGroup={singleCandidate.politicalGroup}
                                buttonName='Usuń kandydata z listy'
                                delete={deleteFromList}
                            />)})
                        }

                        </ul>
                    </div>




                 {/* {
                     candList.map(function (singleCandidate) {
                        return <Candidate

                            key={singleCandidate.id}
                            id={singleCandidate.id}
                            name={singleCandidate.firstName}
                            surname={singleCandidate.lastName}
                            politicalGroup={singleCandidate.politicalGroup}
                            delete={deleteFromList}
                            buttonName='Usuń kandydata z listy'
                            />
                        })
                 } */}

                </>)
                
                        )

}


export default GetOneElection;
