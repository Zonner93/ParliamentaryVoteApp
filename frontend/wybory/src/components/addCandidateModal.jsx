import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Candidate from './candidate';
import "./pages/listCandidates.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';



function AddCandidateModal(props) {

    const navigate = useNavigate();

    const electionIDD = props.id

    const changeCandList = props.changeCandList;

    const[allCandidates, setAllCandidates] = useState([])
    // const[unallocatedCandidates, setUnallocatatedCandidates] = useState([])
    const[open, setOpen] = useState(false);

    // function filterCandidates(){
    //     return setUnallocatatedCandidates(function(){
    //         allCandidates.filter(function(x){
    //             return x.electionId === 0
    //         })

    //     })
    // }

    useEffect(function(){
        getAllCandidates()
    },[])

    function getAllCandidates(){
        axios({
            method:'get',
            url: 'http://localhost:8080/api/candidates/all',
            auth: {
              username: sessionStorage.email,
              password: sessionStorage.password
              }
        }).then(function(response) {
                setAllCandidates(response.data)
                console.log("getAllCandidateswww")
                console.log(response.data)
                }
            );
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



    function handleOpen() {
            getAllCandidates()
       setOpen(true)
}
    function handleClose() {
        setOpen(false)
        props.refresh()
    };

  function addCandidateToElection(id, candidateProps) {

    axios({
        method: 'post',
        url: 'http://localhost:8080/api/elections/'+electionIDD+'/add-candidate?candidateId='+id,
        auth: {
          username: sessionStorage.email,
          password: sessionStorage.password
          }
  }).then(function(response){
    NotificationManager.success(response.status + "Pomyślnie dodano kandydata do głosowania")

    changeCandList( allCandidates.find((candidate) => candidate.id == id))

    setAllCandidates(function(){
        return allCandidates.filter(function(x){
            console.log(x.id + "\\" + id);
            return x.id  !== id
        })
    })
}).catch(function(err){
        NotificationManager.error("Wystąpił błąd: " + err.message)
      })
}

  return (
    <div>
      <Button variant = "outlined" onClick={handleOpen}>Dodaj kandata do głosowania</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wbierz kandata, którego chcesz dodać do głosowania
          </Typography>
{/* dodawanie listy kandydatów */}
<div className="container scroller">
	<ul className="responsive-table">
	  <li className="table-header">
		<div className="col col-1">ID</div>
		<div className="col col-2">Imię</div>
		<div className="col col-3">Nazwisko</div>
		<div className="col col-4">Partia</div>
		<div className="col col-5"></div>
	  </li>
	{
		allCandidates.map(function (singleCandidate) {
            if(singleCandidate.electionId == 0) {
		        return (
                <Candidate
                key={singleCandidate.id}
                id={singleCandidate.id}
                electionId={singleCandidate.electionId}
                firstName={singleCandidate.firstName}
                lastName={singleCandidate.lastName}
                email={singleCandidate.email}
                politicalGroup={singleCandidate.politicalGroup}
                icon="plus"
                action={addCandidateToElection}
            />)

            }
        })
	}

	</ul>
</div>
{/* dodawanie listy kandydatów */}
        </Box>
      </Modal>
    </div>
  );
}


export default AddCandidateModal;
