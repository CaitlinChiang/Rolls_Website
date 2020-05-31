import React from 'react'
import * as firebase from 'firebase'


function logout() {
	const confirm = window.confirm('Are you sure you would like to logout?')
	if (confirm) { firebase.auth().signOut() }
}

function Navbar(props) {
	return (
		<header>

			<div class="menu">
				<button id="menu-button"><img src="/images/iconMenu.png" /></button>
			  	<div class="menu-options">
			    	<button onClick={props.goHome}><a href="#home">Home</a></button>
					<button onClick={props.goHome}><a href="#about">About</a></button>
					<button onClick={props.goProducts}>Order Now</button>
					<button onClick={props.goArticles}>Articles</button>
					<button onClick={() => logout()}>Logout</button>
					<img src="/images/logo_navbar.jpg" />
			  	</div>
			</div>

			<div class="profile">
				<img onClick={props.goCart} src="/images/cartImage.jpg" />
			</div>

		</header>
	)
}

export default Navbar