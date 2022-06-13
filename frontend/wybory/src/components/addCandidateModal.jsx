import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GetAllCandidates from './pages/getAllCandidates';
import axios from 'axios';
import Candidate from './candidate';
import "./pages/listCandidates.css"


function AddCandidateModal(props) {

    const[allCandidates, setAllCandidates] = useState([])
    const[candList,setCandList] = useState([])
    const[unallocatedCandidates, setUnallocatatedCandidates] = useState([])

    function getAllCandidates(){
        axios({
            method:'get',
            url: 'http://localhost:8080/api/candidates/all'
        }).then(function(response) {
                setAllCandidates(response.data)
                setCandList(response.data.candidateList)
                console.log(response.data)
                }
            );
    }
    
    useEffect(function(){getAllCandidates()}, [])
    



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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function addCandidateToElection(id, candidateProps) {

    const electionID = props.id
    axios({
        method: 'post',
        url: 'http://localhost:8080/api/elections/5/add-candidate?candidateId='+id
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
		return (
			<Candidate
			key={singleCandidate.id}
			id={singleCandidate.id}
			name={singleCandidate.firstName}
			surname={singleCandidate.lastName}
			email={singleCandidate.email}
			politicalGroup={singleCandidate.politicalGroup}
			buttonName='Dodaj do głosowania'
			delete={addCandidateToElection}
		/>)})
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
