import axios from "axios";
import React, {useState, useEffect} from "react";

import {useNavigate } from "react-router-dom"
import Election from "../election.jsx";



function AllElections(props){

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

}

    return(
            allElections.map(function(singleElection){

                return <Election
                    key={singleElection.id}
                    id={singleElection.id}
                    startDate={singleElection.startDate}
                    endDate={singleElection.endDate}
                    name={singleElection.name}
                    details={showDetails}
                />
            })
    )
}


export default AllElections;
