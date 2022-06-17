import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';




 function EditElectionModal(props) {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
      const data = props.electionInfoData

  const[electionInfo, setElectionInfo] = useState(data)
  const[editedElectionInfo, setEditedElectionInfo] = useState(data)
  const[open, setOpen] = React.useState(false);



    function handleChange(event){
    const{name, value} = event.target
    console.log(name + value)
    setEditedElectionInfo(function(prevValue){
        console.log()
        return {
            ...prevValue,
            [name] : value
        }
    })
    }


    function patchElection(id){
     console.log(id)
        axios({
            method:'patch',
            url: 'http://localhost:8080/api/elections/'+id,
            data: editedElectionInfo
        }).then(function(response){
            props.updateElectionInfo()
            handleClose()
            NotificationManager.success("Pomyślnie edytowano dane głoswania")
        }).catch(function(err){
            NotificationManager.error(err.message)
        })
    }

    function cancelChanges(){
        console.log(electionInfo)
        setEditedElectionInfo(electionInfo);
        handleClose()
    }

  const handleOpen = () => {setOpen(true)
    setEditedElectionInfo(data)}

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Edytuj głosowanie</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edycja głosowania
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
            <TextField name ="name" id="standard-basic" label="Nazwa" variant="standard" value={editedElectionInfo.name} onChange={handleChange} />
            <TextField type="date" name ="startDate" id="standard-basic" label="Data rozpoczęcia" variant="standard" value={editedElectionInfo.startDate} onChange={handleChange}/>
            <TextField type="date" name ="endDate" id="standard-basic" label="Data zakończenia" variant="standard" value={editedElectionInfo.endDate} onChange={handleChange}/>
            <TextField name ="description" id="standard-basic" label="Opis" variant="standard" value={editedElectionInfo.description} onChange={handleChange}/>

            <Button variant="text" onClick={function(event){patchElection(props.electionInfoData.id); event.preventDefault()}}>Zapisz zmiany</Button>
            <Button variant="text" onClick={function(event){cancelChanges(); event.preventDefault()}}>Anuluj</Button>
        </Box>
      </Modal>
    </div>
  );
}


export default EditElectionModal;