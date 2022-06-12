import axios from "axios";
import React, {useState, useEffect} from "react";
import OneElection from "./oneElection.jsx";
import {useNavigate} from "react-router-dom"
import Candidate from "../candidate.jsx";
import Modal from  "react-modal"
import { useParams } from 'react-router-dom';



function GetOneElection(props){

const navigate = useNavigate();

const[oneElection, setOneElection] = useState([])
const[candList,setCandList] = useState([])
const[modal, setModal]=useState(true)
let {userID} = useParams();

function toggleModal () {
    setModal(function(prevValue){
        return !prevValue
    })
}

useEffect(function(){getOneElection()},[])


function getOneElection(){

    axios({
        method:'get',
        url:'http://localhost:8080/api/elections/'+userID
    }).then(function(response){
        setOneElection(response.data)
        setCandList(response.data.candidateList)
    })
}


function deleteElection(electionId){
    console.log("id usun "+  electionId)

    axios({
        method:'delete',
        url:'http://localhost:8080/api/elections/'+userID
    }).then(
        navigate('/allelections')
    )
}


function editElection(id){
    //post na patch election by id

    axios({
        method: 'patch',
        url:'http://localhost:8080/api/elections/'+id,
        data: oneElection

    })
    toggleModal()
    console.log("edited")

    // czy ponowić getOneElection?

}




function assignCandidate(){

}

function deleteFromList (id){


   async function filterCandList(id) {
     const filtered = await candList.filter(function(singleCandidateFromList){
            return(singleCandidateFromList.id!=id)
            })

            return filtered
    }

    async function newElectionData() {
        return {
            ...oneElection,
            candidateList : await filterCandList()
        }
    }

    axios({
        method: 'patch',
        url:'http://localhost:8080/api/elections/'+id,
        data: newElectionData()

    })




    //utworzyć nowy useState z listą .... jeden do wyświetlania, drugi tylko do usuwania

    // getOneElection?

    setCandList(candList.filter(function(singleCandidateFromList){
        return(singleCandidateFromList.id!=id)
        })
    )

    setOneElection(function(prevValue){
        return{
            ...prevValue,
            candidateList : candList
        }
    })

    axios({
        method: 'patch',
        url:'http://localhost:8080/api/elections/'+id,
        data: oneElection

    })

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

                modal ?
                (<>

                    <p>ID:{oneElection.id}</p>
                    <p>Nazwa : {oneElection.name}</p>
                    <p>Data rozpoczęcia : {oneElection.startDate}</p>
                    <p>Data zakończenia : {oneElection.endDate}</p>
                    <p>Opis : {oneElection.description}</p>


                    <button onClick={function(event){
                        toggleModal()
                        event.preventDefault();
                    }
                    }> Edytuj głosowanie</button>

                    <button onClick={function(event){
                        deleteElection(oneElection.id)
                        event.preventDefault();
                    }
                    }> Usuń głosowanie</button>


                    <button onClick={function(event){
                        assignCandidate(oneElection.id)
                        event.preventDefault();
                    }
                    }> Dodaj kandydata do głosowania</button>

                    <p>Lista kandydatów:</p>


                 {
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
                 }

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
                       toggleModal()
                        event.preventDefault();
                        }}> Anuluj</button>


                    <p>Lista kandydatów:</p>


                 {
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
                 }

                </>)

                        )

}


export default GetOneElection;
