import axios from "axios";
import React, {useState, useEffect} from "react";

import {useNavigate } from "react-router-dom"
import Election from "../election.jsx";



function AllFinishedElections(props){

const navigate = useNavigate();

function getAllElections(){
    axios({
        method:'get',
        url:'http://localhost:8080/api/elections/finished',
        auth: {
			username: sessionStorage.email,
			password: sessionStorage.password
		  }
    }).then(function(response){setAllElections(response.data)})
}

const[allElections, setAllElections] = useState([])

useEffect(function(){getAllElections()},[])

function showDetails(electionId){
    navigate('/results/'+electionId)
}

    return(

        <div class="container">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">ID</div>
            <div class="col col-2">Nazwa</div>
            <div class="col col-3">Data rozpoczęcia</div>
            <div class="col col-4">Data zakończenia</div>
            <div class="col col-5"></div>
          </li>
          {
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
        }
        </ul>
    </div>
    )
}


export default AllFinishedElections;
