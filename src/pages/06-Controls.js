import React, { Component } from 'react'
import * as firebase from 'firebase'


class Controls extends Component {
	state = {
		orders: []
	}

	componentDidMount = async () => {
		firebase.database().ref('rolls').once('value', snapshot => {
			let orders = []
			snapshot.forEach((snap) => {
				snap.forEach((order) => {
					order.forEach((details) => {
						if (details.val().Mode === 'Pickup') {
							this.addPickupInfo(details.val().Name, details.val().Number, details.val().PickupPayment, details.val().PickupDate)
						}
						else if (details.val().Mode === 'Delivery') {
							this.addDeliveryInfo(details.val().Name, details.val().Number, details.val().DeliveryPayment, details.val().DeliveryDate, details.val().Address, details.val().City)
						}
					})
				})
			})
		})
	}

	//remove spaces in phone number
	//remove button functionality
	//sort by date
	addPickupInfo = (name, number, mode, date) => {
		var joined = this.state.orders.concat(
			<tr>
				<td>{name}<br />{number}</td>
				<td></td>
				<td></td>
				{mode === 'P_transfer' ? <td>BDO Transfer</td> : <td>Payment on Pickup</td>}
				<td>{date}</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td><button>Remove</button></td>
			</tr>
		)
		this.setState({ orders: joined })
	}

	addDeliveryInfo = (name, number, mode, date, address, city) => {
		var joined = this.state.orders.concat(
			<tr>
				<td>{name}<br />{number}</td>
				<td></td>
				<td></td>
				{mode === 'D_transfer' ? <td>BDO Transfer</td> : <td>Cash on Delivery</td>}
				<td>{date}</td>
				<td>{address}</td>
				<td>{city}</td>
				<td></td>
				<td><button>Remove</button></td>
			</tr>
		)
		this.setState({ orders: joined })
	}
			
	render() {
		return (
			<div>
				<section id="viewing">
					<div class="container">
						<table class="viewingTable">
						  	<thead>
							    <tr>
							    	<th>Contact</th>
							        <th>Item</th>
							        <th>Amount</th>
							      	<th>Mode</th>
							      	<th>Date</th>
							      	<th>Address</th>
							      	<th>City</th>
							      	<th>Route</th>
							      	<th></th>
							    </tr>
						  	</thead>
							<tbody>{this.state.orders}</tbody>
						</table>
					</div>
				</section>
			</div>
		)
	}
}

export default Controls