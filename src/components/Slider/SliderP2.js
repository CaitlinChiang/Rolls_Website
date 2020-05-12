import React, { Component } from 'react'


class Slider2 extends Component {

	state = {
		inStock: true,
		addedInCartP2: false
	}

	addToCart = () => {
		this.setState({ addedInCartP2: true })
	}

	render() {
		return (
			<div>
				<div id="product_description">
					<p>Classic Cinnamon Rolls: 6pcs - P350.00</p>
					{this.state.inStock ? <p>(In Stock)</p> : <p>(Out of Stock)</p>}
					<button class="ripple" onClick={this.addToCart}>Add To Cart</button>
				</div>
				<div id="productImage">
					<img src="/images/p2.jpg" />
				</div>
			</div>
		)
	}
}

export default Slider2