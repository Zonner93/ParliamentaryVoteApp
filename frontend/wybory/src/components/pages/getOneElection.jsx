import axios from "axios";
import React, {useState, useEffect} from "react";
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
            })
    )
}


export default GetOneElection;
