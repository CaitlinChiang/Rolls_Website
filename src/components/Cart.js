import React, { Component } from 'react'
import Order from './OrderForm.js'
import * as firebase from 'firebase'


class Cart extends Component {
	state = {
		consumer: this.props.consumer,
		pendingOrders: [],

		displayForm: false
	}

	componentDidMount = async () => {
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			let pendingOrders = []
			snapshot.forEach((snap) => { pendingOrders.push(snap.val() + ' ' + snap.key) })
			this.setState({ pendingOrders })
		})
	}

	remove = (id) => firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').child(id).remove()

	goOrder = (event) => {
		event.preventDefault()
		this.setState({ displayForm: true })
	}

	render() {
		const Pending = this.state.pendingOrders.map(order => {
			let item = order.split(' ')
			if (item[0].includes('P1')) {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>1</td>
					    <td>P60.00</td>
					    <td><button onClick={() => this.remove(item[1])}>Remove</button></td>
				    </tr>
				)
			}
			else if (item[0].includes('P2')) {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>6</td>
					    <td>P350.00</td>
					    <td><button onClick={() => this.remove(item[1])}>Remove</button></td>
				    </tr>
				)
			}
			else if (item[0].includes('P3')) {
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
						<h1>MY CART</h1>
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
				{this.state.displayForm ? <Order pendingOrders={this.props.pendingOrders} consumer={this.props.consumer} /> : null}
			</div>
		)
	}
}

export default Cart