import React from 'react'
import * as firebase from 'firebase'


function logout() {
	const confirm = window.confirm('Are you sure you would like to logout?')
	if (confirm) { firebase.auth().signOut() }
}

function ControlsNavbar(props) {
	return (
		<header>
			<div class="navbar_buttons">
				<button onClick={props.goOrders}>Orders</button>
				<button onClick={props.goControls}>Controls</button>
				<button onClick={() => logout()}>Logout</button>
			</div>					
		</header>
	)
}

export default ControlsNavbar