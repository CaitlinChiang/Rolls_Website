import React from 'react'


function Navbar(props) {
	return (
		<header>
			<div class="container" id="navbar_buttons">
				<button onClick={props.goHome}><a href="#home">HOME</a></button>
				<button onClick={props.goHome}><a href="#about">ABOUT</a></button>
				<button>PRODUCTS</button>
			</div>
		</header>
	)
}

export default Navbar