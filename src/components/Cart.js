import React, { Component } from 'react'
import * as firebase from 'firebase'


class Cart extends Component {
	state = {
		consumer: this.props.consumer,
		pendingOrders: []
	}

	componentDidMount = async () => {
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			let pendingOrders = []
			snapshot.forEach((snap) => { pendingOrders.push(snap.val())	})
			this.setState({ pendingOrders })
		})
	}

	deleteItem = (event) => {
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').child('-M7WLT7dHdowROrZbRbi').remove()
	}

	render() {
		const Pending = this.state.pendingOrders.map(item => {
			if (item === 'Classic Cinammon Roll - 1pc') {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>1</td>
					    <td>P60.00</td>
					    <td><button onClick={this.deleteItem}>Remove</button></td>
				    </tr>
				)
			}
			else if (item === 'Classic Cinammon Roll - 6pcs') {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>6</td>
					    <td>P350.00</td>
					    <td><button onClick={this.deleteItem}>Remove</button></td>
				    </tr>
				)
			}
			else if (item === 'Classic Cinammon Roll - 12pcs') {
				return (
					<tr>
				        <td>Classic Cinammon Roll</td>
					    <td>12</td>
					    <td>P600.00</td>
					    <td><button onClick={this.deleteItem}>Remove</button></td>
				    </tr>
				)
			}
		})

		return (
			<section id="status">
				<div class="container">
					<h1>MY CART</h1>
				
					<table class="orderTable">
					  	<thead>
						    <tr>
						        <th>Item</th>
						      	<th>Pieces</th>
						      	<th>Price</th>
						      	<th>Delete</th>
						    </tr>
					  	</thead>
						<tbody>
						    {Pending}
						</tbody>
					</table>
				</div>
			</section>
		)
	}
}

export default Cart