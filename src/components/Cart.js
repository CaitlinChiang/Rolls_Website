import React, { Component } from 'react'
import Order from './OrderForm.js'
import * as firebase from 'firebase'


class Cart extends Component {
	state = {
		consumer: this.props.consumer,
		pendingOrders: [],

		orders: [],
		items: [],

		displayForm: false
	}

	componentDidMount = async () => {
		this.displayOrder()

		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			let pendingOrders = []
			snapshot.forEach((snap) => { pendingOrders.push(snap.val() + ' ' + snap.key) })
			this.setState({ pendingOrders })
		})
	}

	displayOrder = () => {
		firebase.database().ref('rolls').once('value', snapshot => {
			snapshot.forEach((snap) => {
				if (snap.key === this.state.consumer) {
					snap.forEach((order) => {
						if (order.hasChild('Order Items')) {
							order.forEach((details) => {
								let items = []
								details.forEach((product) => { items.push(product.val()) })
								this.setState({ items })
							})
						}
						order.forEach((details) => {
							if (details.val().Mode === 'Pickup') {
								this.getInfo(this.state.items.map(item => {
									if (item === 'P1') { return <p>6pcs</p> }
									else if (item === 'P2') { return <p>12pcs</p> }
								}), details.val().Price, details.val().orderStatus, details.val().paymentStatus)
							}
							else if (details.val().Mode === 'Delivery') {
								this.getInfo(this.state.items.map(item => {
									if (item === 'P1') { return <p>6pcs</p> }
									else if (item === 'P2') { return <p>12pcs</p> }
								}), details.val().Price, details.val().orderStatus, details.val().paymentStatus)
							}
						})	
					})
				}
			})
		})	
	}

	getInfo = (products, price, orderStatus, paymentStatus) => {
		var row = this.state.orders.concat(
			<tr>
				<td>{products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				<td>{paymentStatus}</td>
			</tr>
		)
		this.setState({ orders: row })
	}

	remove = (id) => firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').child(id).remove()

	goOrder = (event) => {
		event.preventDefault()
		this.setState({ displayForm: true })
	}

	render() {
		const Processed = this.state.orders.map(item => item)

		const Pending = this.state.pendingOrders.map(order => {
			let item = order.split(' ')
			if (item[0].includes('P1')) {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>6</td>
					    <td>P350.00</td>
					    <td><button onClick={() => this.remove(item[1])}>Remove</button></td>
				    </tr>
				)
			}
			else if (item[0].includes('P2')) {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>12</td>
					    <td>P600.00</td>
					    <td><button onClick={() => this.remove(item[1])}>Remove</button></td>
				    </tr>
				)
			}
		})

		return (
			<div>
				<section id="status">
					<div class="container">

						<table class="orderTable">
						  	<thead>
							    <tr>
							        <th>Order</th>
							      	<th>Total Amount</th>
							      	<th>Order Status</th>
							      	<th>Payment Status</th>
							    </tr>
						  	</thead>
							<tbody>{Processed}</tbody>
						</table>

						<table class="orderTable">
						  	<thead>
							    <tr>
							        <th>Item</th>
							      	<th>Pieces</th>
							      	<th>Price</th>
							      	<th></th>
							    </tr>
						  	</thead>
							<tbody>{Pending}</tbody>
						</table>
					</div>
					<button onClick={this.goOrder} id="checkoutButton">Checkout</button>
				</section>
				{this.state.displayForm ? <Order consumer={this.props.consumer} /> : null}
			</div>
		)
	}
}

export default Cart