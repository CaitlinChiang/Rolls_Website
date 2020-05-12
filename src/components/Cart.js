import React, { Component } from 'react'


class Cart extends Component {
	state = {
		displayp1: true,
		displayp2: false,
		displayp3: false
	}

	//logout feature

	//check database if email used to log in has orders in their databse, and reflect "pending orders" upon mount by changing display state
	//option to delete from cart

	//when purchased, transfer the "pending orders" into "completed orders"

	render() {
		return (
			<section id="status">
				<div class="container">
					<h1>MY CART</h1>
				</div>
			</section>
		)
	}
}

export default Cart