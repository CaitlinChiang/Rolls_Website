import React from 'react'


function Navbar(props) {
	return (
		<header>
			<div class="dropdown">
				<button id="dropdown-button"><img src="/images/iconMenu.png" /></button>
			  	<div class="dropdown-content">
			    	<button onClick={props.goHome}><a href="#home">Home</a></button>
					<button onClick={props.goHome}><a href="#about">About</a></button>
					<button onClick={props.goProducts}>Products</button>
					<button onClick={props.goArticles}>Articles</button>
			  	</div>
			</div>
			<div class="profile">
				<img onClick={props.goProfile} src="/images/profileIcon.png" />
			</div>
		</header>
	)
}

export default Navbar