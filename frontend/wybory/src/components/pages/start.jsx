import React from "react";
import MenuItem from "../menuItem";
import {useNavigate } from "react-router-dom"


const Start = () => {

const navigate = useNavigate();

function goToPath(route) {
	console.log(route)
	navigate(route);

}

return (
	<div>
		<MenuItem
			name="Wyświetl wszystkich kandydatów"
			route="/getallcandidates"
			goTo={goToPath}
		/>
		<MenuItem
			name="Dodaj Kandydata"
			route="/addcandidate"
			goTo={goToPath}
		/>
		{/* <MenuItem
			name="Usuń kandata"
			route="/deletecandidate"
			goTo={goToPath}
		/> */}
		<MenuItem
			name="Wyświetl wszystkie głosowania"
			route="/allelections"
			goTo={goToPath}
		/>
		<MenuItem
			name="Utwórz głosowanie"
			route="/createelection"
			goTo={goToPath}
		/>
		{/* <MenuItem
			name="Usuń głosowanie"
			route="/"
			goTo={goToPath}
		/> */}


	</div>
);
};

export default Start;
