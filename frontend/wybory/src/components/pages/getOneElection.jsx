import axios from "axios";
import React, {useState, useEffect} from "react";
import Election from "../election.jsx"
import OneElection from "./oneElection.jsx";
import {useNavigate} from "react-router-dom"



function GetOneElection(){

const navigate = useNavigate();

function getAllElections(){
    axios({
        method:'get',
        url:'http://localhost:8080/api/elections/all'
    }).then(function(response){setAllElections(response.data)})
}

const[allElections, setAllElections] = useState([])

useEffect(function(){getAllElections()},[])

function showDetails(electionId){
    navigate('/elections/'+electionId)
    // getAllElections('http://localhost:8080/api/elections/'+electionId)
}

    return(
            allElections.map(function(singleElection){
                return(OneElection(singleElection,function(){showDetails(singleElection.id)}))
                // return <Election
                //     key={singleElection.id}
                //     id={singleElection.id}
                //     startDate={singleElection.startDate}
                //     endDate={singleElection.endDate}
                //     name={singleElection.name}
                //     details={showDetails}
                // />
            })
    )
}


export default GetOneElection;
