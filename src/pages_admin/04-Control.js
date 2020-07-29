import React, { Component } from 'react'
import * as firebase from 'firebase'


class Controls extends Component {
	state = {
		maxDeliveries: 0,

		discount: 0,
		discountCode: '',

		price: 0,
		priceCode: '',

		freeDeliveryCode: ''
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

	p3Stock = (event) => firebase.database().ref('products').child('P3').update({ Stock: true })
	p3NoStock = (event) => firebase.database().ref('products').child('P3').update({ Stock: false })

	p4Stock = (event) => firebase.database().ref('products').child('P4').update({ Stock: true })
	p4NoStock = (event) => firebase.database().ref('products').child('P4').update({ Stock: false })

	p5Stock = (event) => firebase.database().ref('products').child('P5').update({ Stock: true })
	p5NoStock = (event) => firebase.database().ref('products').child('P5').update({ Stock: false })

	p6Stock = (event) => firebase.database().ref('products').child('P6').update({ Stock: true })
	p6NoStock = (event) => firebase.database().ref('products').child('P6').update({ Stock: false })

	//change maximum delivery number
	changeDeliveryNumber = (event) => {
		if (this.state.maxDeliveries >= 0) { firebase.database().ref('products').child('Delivery Number').update({ MaxDelivery: this.state.maxDeliveries }) }
		else { alert("Please input an integer greater or equal to 0.") }
	}

	//set discount codes
	setDiscount = (event) => {
		if (this.state.discount >= 0) { firebase.database().ref('products').child('Discount Amount').update({ Discount: this.state.discount }) }
		else { alert("Please input an integer greater or equal to 0.") }
	}

	setPrice = (event) => {
		if (this.state.price >= 0) { firebase.database().ref('products').child('Discount Price').update({ AmountOff: this.state.price }) }
		else { alert("Please input an integer greater or equal to 0.") }
	}

	generateCode = (length, code, child) => {
		var result = ''
		var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789'
		var charactersLength = characters.length
		for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		this.setState({ [code]: result })

		firebase.database().ref('discounts').child(child).push(result).then(() => alert("This voucher code is now registered."))
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
							<p>Classic Cinammon Rolls - 6pcs</p>
							<button onClick={this.p1Stock}>In Stock</button>
							<button onClick={this.p1NoStock}>Out of Stock</button>

							<p>Classic Cinammon Rolls - 12pcs</p>
							<button onClick={this.p2Stock}>In Stock</button>
							<button onClick={this.p2NoStock}>Out of Stock</button>

							<p>Double Chocolate Cinammon Rolls - 6pcs</p>
							<button onClick={this.p3Stock}>In Stock</button>
							<button onClick={this.p3NoStock}>Out of Stock</button>

							<p>Double Chocolate Cinammon Rolls - 12pcs</p>
							<button onClick={this.p4Stock}>In Stock</button>
							<button onClick={this.p4NoStock}>Out of Stock</button>

							<p>Caramel Pecan Rolls - 6pcs</p>
							<button onClick={this.p5Stock}>In Stock</button>
							<button onClick={this.p5NoStock}>Out of Stock</button>

							<p>Caramel Pecan Rolls - 12pcs</p>
							<button onClick={this.p6Stock}>In Stock</button>
							<button onClick={this.p6NoStock}>Out of Stock</button>
						</div>
						
					</div>
				</section>

				<div class="discountPercent">
					<div id="discountHeader"> <h1>Discount Voucher by Percent</h1> </div>
					<button onClick={() => this.generateCode(10, 'discountCode', 'Generated')}>Generate Voucher Code</button>
					<input value={this.state.discountCode} name="discountCode" type="text" placeholder="Generated Code" disable autocomplete="off" />
					<input onChange={this.handleChange} value={this.state.discount} name="discount" type="number" />
					<button onClick={this.setDiscount}>Change Discount Percent</button>
				</div>

				<div class="discountPrice">
					<div id="discountHeader"> <h1>Discount Voucher by Price</h1> </div>
					<button onClick={() => this.generateCode(9, 'priceCode', 'PriceGenerated')}>Generate Voucher Code</button>
					<input value={this.state.priceCode} name="priceCode" type="text" placeholder="Generated Code" disable autocomplete="off" />
					<input onChange={this.handleChange} value={this.state.price} name="price" type="number" />
					<button onClick={this.setPrice}>Change Discount Price</button>
				</div>

				<div class="discountDelivery">
					<div id="discountHeader"> <h1>Discount Voucher by Delivery Fee</h1> </div>
					<button onClick={() => this.generateCode(8, 'freeDeliveryCode', 'DeliveryGenerated')}>Generate Voucher Code</button>
					<input value={this.state.freeDeliveryCode} name="freeDeliveryCode" type="text" placeholder="Generated Code" disable autocomplete="off" />
				</div>
			</div>
		)
	}
}

export default Controls