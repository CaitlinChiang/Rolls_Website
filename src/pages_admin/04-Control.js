import React, { Component } from 'react'
import * as firebase from 'firebase'


class Controls extends Component {
	state = {
		maxDeliveries: 0,
		discount: 0,
		discountCode: ''
	}

	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	//stock toggle functions
	p1Stock = (event) => firebase.database().ref('products').child('P1').update({ Stock: true })
	p1NoStock = (event) => firebase.database().ref('products').child('P1').update({ Stock: false })

	p2Stock = (event) => firebase.database().ref('products').child('P2').update({ Stock: true })
	p2NoStock = (event) => firebase.database().ref('products').child('P2').update({ Stock: false })

	//change maximum delivery number
	changeDeliveryNumber = (event) => {
		if (this.state.maxDeliveries >= 0) {
			firebase.database().ref('products').child('Delivery Number').update({ MaxDelivery: this.state.maxDeliveries })
		}
		else { alert("Please input an integer greater or equal to 0.") }
	}

	//promo codes
	setDiscount = (event) => {
		if (this.state.discount >= 0) {
			firebase.database().ref('products').child('Discount Amount').update({ Discount: this.state.discount })
		}
		else { alert("Please input an integer greater or equal to 0.") }
	}

	generateCode = (length) => {
		var result = ''
		var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789'
		var charactersLength = characters.length
		for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		this.setState({ discountCode: result })

		firebase.database().ref('discounts').child('Generated').push(result)
		.then(() => alert("This voucher code is now registered."))
	}

	render() {
		return (
			<div>
				<section id="viewing">
					<div class="container slideDown">

						<div id="adminHeader"> <h1>Control Panel</h1> </div>

						<div class="maxDel">
							<input onChange={this.handleChange} value={this.state.maxDeliveries} name="maxDeliveries" type="number" />
							<button onClick={this.changeDeliveryNumber}>Change Maximum Deliveries</button>
						</div>

						<div class="toggle">
							<p>Cinammon Rolls - 6pcs</p>
							<button onClick={this.p1Stock}>In Stock</button>
							<button onClick={this.p1NoStock}>Out of Stock</button>

							<p>Cinammon Rolls - 12pcs</p>
							<button onClick={this.p2Stock}>In Stock</button>
							<button onClick={this.p2NoStock}>Out of Stock</button>
						</div>

						<div class="generateCode">
							<button onClick={() => this.generateCode(10)}>Generate Voucher Code</button>
							<input value={this.state.discountCode} name="discountCode" type="text" placeholder="Generated Code" disable />
						</div>

						<div class="discount">
							<input onChange={this.handleChange} value={this.state.discount} name="discount" type="number" />
							<button onClick={this.setDiscount}>Change Discount Amount</button>
						</div>

					</div>
				</section>
			</div>
		)
	}
}

export default Controls