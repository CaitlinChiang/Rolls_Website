import React, { Component } from 'react'
import * as firebase from 'firebase'


class Controls extends Component {
	state = {
		maxDeliveries: 0
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

	render() {
		return (
			<div>
				<section id="viewing">
					<div class="container slideDown">

						<div id="adminHeader"> <h1>Control Panel</h1> </div>

						<div class="maxDel">
							<input onChange={this.handleChange} value={this.state.maxDeliveries} name="maxDeliveries" type="number" placeholder="Max Deliveries" />
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

					</div>
				</section>
			</div>
		)
	}
}

export default Controls