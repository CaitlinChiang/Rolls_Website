import React from 'react'
import * as firebase from 'firebase'


function logout() {
	const confirm = window.confirm('Are you sure you would like to logout?')
	if (confirm) { firebase.auth().signOut() }
}

function Navbar(props) {
	return (
		<header>
			<div class="navbar_buttons">
				<div class="logo"> 
					<img src="/images/logo_navbar.jpg" /> 
					<p>ROLLS</p>
				</div>

				<button onClick={props.goHome}><a href="#home">Home</a></button>
				<button onClick={props.goHome}><a href="#about">About</a></button>
				<button onClick={props.goProducts}>Order</button>
				<button onClick={props.goArticles}>Articles</button>
				<button onClick={() => logout()}>Logout</button>
				
				<div class="profile"> <img onClick={props.goCart} src="/images/cart.png" /> </div>
			</div>					
		</header>
	)
}

export default Navbar