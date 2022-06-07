import React, {useState} from "react";
import Election from "../election.jsx"



function AllElections(){

const[allElections, setAllElections] = useState(all)





    return(

            allElections.map(function(singleElection){
                return <Election
                    key={singleElection.id}
                    id={singleElection.id}
                    startDate={singleElection.startDate}
                    endDate={singleElection.endDate}
                    name={singleElection.name}
                />

            })
    )
}


export default AllElections;




const all = [
    {
        "id": 1,
        "startDate": "2022-06-07",
        "endDate": "2022-06-25",
        "name": "Wybory parlamentarne 1",
        "description": "jakiś opis wyborów 1",
        "candidateList": []
    },
    {
        "id": 2,
        "startDate": "2022-06-07",
        "endDate": "2022-06-25",
        "name": "Wybory parlamentarne 1",
        "description": "jakiś opis wyborów 1",
        "candidateList": []
    },
    {
        "id": 3,
        "startDate": "2022-06-07",
        "endDate": "2022-06-25",
        "name": "Wybory parlamentarne 1",
        "description": "jakiś opis wyborów 1",
        "candidateList": []
    },
    {
        "id": 4,
        "startDate": "2022-06-07",
        "endDate": "2022-06-25",
        "name": "Wybory parlamentarne 1",
        "description": "jakiś opis wyborów 1",
        "candidateList": []
    },
    {
        "id": 5,
        "startDate": "2022-06-07",
        "endDate": "2022-06-25",
        "name": "Wybory parlamentarne 1",
        "description": "jakiś opis wyborów 1",
        "candidateList": []
    },
    {
        "id": 6,
        "startDate": "qweqwe",
        "endDate": "qweqwe",
        "name": "qweqwe",
        "description": "qweqwewq",
        "candidateList": []
    },
    {
        "id": 7,
        "startDate": "qweqwe",
        "endDate": "qweqwe",
        "name": "qweqwe",
        "description": "qweqwewq",
        "candidateList": []
    },
    {
        "id": 8,
        "startDate": "qweqweqwewqe",
        "endDate": "qweqwewqewqe",
        "name": "qweqwewqewqe",
        "description": "qweqwewqwqewq",
        "candidateList": []
    },
    {
        "id": 9,
        "startDate": "2022-07-06",
        "endDate": "2022-06-01",
        "name": "qwe",
        "description": "qwe",
        "candidateList": []
    },
    {
        "id": 10,
        "startDate": "2022-06-19",
        "endDate": "2022-06-17",
        "name": "qwe",
        "description": "qwe",
        "candidateList": []
    },
    {
        "id": 11,
        "startDate": "",
        "endDate": "",
        "name": "",
        "description": "",
        "candidateList": []
    }
]