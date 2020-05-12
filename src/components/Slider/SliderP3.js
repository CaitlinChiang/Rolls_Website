import React, { Component } from 'react'


class Slider3 extends Component {

	state = {
		inStock: true,
		addedInCartP3: false
	}

	addToCart = () => {
		this.setState({ addedInCartP3: true })
	}

	render() {
		return (
			<div>
				<div id="product_description">
					<p>Classic Cinnamon Rolls: 12pcs - P600.00</p>
					{this.state.inStock ? <p>(In Stock)</p> : <p>(Out of Stock)</p>}
					<button class="ripple" onClick={this.addToCart}>Add To Cart</button>
				</div>
				<div id="productImage">
					<img src="/images/p3.jpg" />
				</div>
			</div>
		)
	}
}

export default Slider3