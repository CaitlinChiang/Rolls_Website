import React, { Component } from 'react'


class Slider1 extends Component {

	state = {
		inStock: true,
		addedInCartP1: false
	}

	addToCart = async (event) => {
		this.setState({ addedInCartP1: true })
		//add this to a "pending orders" child in the database of user who registered / logged in
	}

	render() {
		return (
			<div>
				<div id="product_description">
					<p>Classic Cinnamon Rolls: 1pc - P60.00</p>
					{this.state.inStock ? <p>(In Stock)</p> : <p>(Out of Stock)</p>}
					<button class="ripple" onClick={this.addToCart}>Add To Cart</button>
				</div>
				<div id="productImage">
					<img src="/images/p1.jpg" />
				</div>
			</div>
		)
	}
}

export default Slider1