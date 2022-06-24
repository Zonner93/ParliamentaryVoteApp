import React from "react";
import MenuItem from "../menuItem";
import {useNavigate } from "react-router-dom"


const StartAdmin = () => {

	return <></>

// const navigate = useNavigate();

// function goToPath(route) {
// 	console.log(route)
// 	navigate(route);

// }

// return (
// 	<div className="start">
// 		<MenuItem
// 			name="Wyświetl wszystkich kandydatów"
// 			route="/getallcandidates"
// 			goTo={goToPath}
// 		/>
// 		<MenuItem
// 			name="Dodaj Kandydata"
// 			route="/addcandidate"
// 			goTo={goToPath}
// 		/>
// 		<MenuItem
// 			name="Wyświetl wszystkie głosowania"
// 			route="/allelections"
// 			goTo={goToPath}
// 		/>
// 		<MenuItem
// 			name="Utwórz głosowanie"
// 			route="/createelection"
// 			goTo={goToPath}
// 		/>
// 	</div>
// );
};

export default StartAdmin;



// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';

// const style = {
//   width: '100%',
//   maxWidth: 360,
//   bgcolor: 'background.paper',
// };

// export default function ListDividers() {
//   return (
//     <List sx={style} component="nav" aria-label="mailbox folders">
//       <ListItem button>
//         <ListItemText primary="Inbox" />
//       </ListItem>
//       <Divider />
//       <ListItem button divider>
//         <ListItemText primary="Drafts" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="Trash" />
//       </ListItem>
//       <Divider light />
//       <ListItem button>
//         <ListItemText primary="Spam" />
//       </ListItem>
//     </List>
//   );
// }
