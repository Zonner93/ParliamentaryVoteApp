import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GetAllCandidates from './pages/getAllCandidates';
import axios from 'axios';
import Candidate from './candidate';
import "./pages/listCandidates.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';



function AddCandidateModal(props) {

    const navigate = useNavigate();

    const candList = props.candList
    const electionIDD = props.id
    // console.log("addcanditaemodal")
    // console.log(candList)

    const[allCandidates, setAllCandidates] = useState([])
    // const[candList,setCandList] = useState([])
    const[unallocatedCandidates, setUnallocatatedCandidates] = useState([])
    const[addList, setAddList] = useState([])
    const [open, setOpen] = React.useState(false);

    function filterCandidates(){
        return allCandidates.filter((elem) => !candList.find(({ id }) => elem.id === id))
    }

    function getAllCandidates(){
        axios({
            method:'get',
            url: 'http://localhost:8080/api/candidates/all'
        }).then(function(response) {
                setAllCandidates(response.data)
                console.log("getAllCandidateswww")
                console.log(response.data)
                }
            );
    }

   useEffect(function(){
        console.log("elo1")
        getAllCandidates()
        console.log("elo2")
        setUnallocatatedCandidates(filterCandidates())
        console.log("elo3")
        setAddList(unallocatedCandidates)
        console.log("elo4")
    }, [open])

    // useEffect(function(){
    //     setUnallocatatedCandidates(filterCandidates())
    // },[addList])




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


  
   async function handleOpen() {
            // await getAllCandidates()
            await setUnallocatatedCandidates( await filterCandidates())
            await setAddList(unallocatedCandidates)
       setOpen(true)

        }
  const handleClose = () => {
      setOpen(false)
    //   navigate('/elections/'+electionIDD)
    // use state zamiast reload
      window.location.reload(false);
    };

  function addCandidateToElection(id, candidateProps) {

    axios({
        method: 'post',
        url: 'http://localhost:8080/api/elections/'+electionIDD+'/add-candidate?candidateId='+id
        // zamienic 5 na election ID!
  }).then(function(response){
    NotificationManager.success(response.status + "Pomyślnie dodano kandydata do głosowania")
 
      setAddList(addList.filter(function(x){
          return id != x.id

      }))}

      ).catch(function(err){
        NotificationManager.error("Wystąpił błąd: " + err.message)
      }
      )
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
		addList.map(function (singleCandidate) {
		return (
			<Candidate
			key={singleCandidate.id}
			id={singleCandidate.id}
            electionId={singleCandidate.electionId}
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
