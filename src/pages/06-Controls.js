import React, { Component } from 'react'
import * as firebase from 'firebase'


class Controls extends Component {
	state = {
		orders: [],                   purchase: '',

		items: [],                    person: '',

		orderStatus: 'Ready',         paymentStatus: 'Payment Confirmed'
	}

	componentDidMount = async () => {
		this.data()
	}

	data = () => {
		firebase.database().ref('rolls').once('value', snapshot => {
			snapshot.forEach((snap) => {
				this.setState({ person: snap.key })
				snap.forEach((order) => {
					this.setState({ purchase: order.key })
					//append the products from 'Order Items' into the items array state
					if (order.hasChild('Order Items')) {
						order.forEach((details) => {
							let items = []
							details.forEach((product) => { items.push(product.val()) })
							this.setState({ items })
						})
					}
					//append all the details from 'Order Details' to the specified functions
					order.forEach((details) => {
						if (details.val().Mode === 'Pickup') {
							this.addPickupInfo(details.val().Name, details.val().Number, this.state.items.map(item => {
								if (item === 'P1') { return <p>6pcs</p> }
								else if (item === 'P2') { return <p>12pcs</p> }
							}), details.val().Price, details.val().PickupPayment, details.val().PickupDate, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase)
						}
						else if (details.val().Mode === 'Delivery') {
							this.addDeliveryInfo(details.val().Name, details.val().Number, this.state.items.map(item => {
								if (item === 'P1') { return <p>6pcs</p> }
								else if (item === 'P2') { return <p>12pcs</p> }
							}), details.val().Price, details.val().DeliveryPayment, details.val().DeliveryDate, details.val().Address, details.val().City, details.val().Route, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase)
						}
					})	
				})
			})
		})	
	}

	getTime = () => {
		let newDate = new Date()

		let dateToday = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		let hour = newDate.getHours();
		let min = newDate.getMinutes();
		let sec = newDate.getSeconds();

		return month + "-" + dateToday + "-" + year + "||" + hour + ":" + min + ":" + sec
	}

	addPickupInfo = (name, number, products, amount, mode, date, instruction, description, person, order) => {
		let object = order
		var row = this.state.orders.concat(
			<tr id={object}>
				<td>{name}<br />{number}</td>
				<td>{products}</td>
				<td>P{amount}.00</td>
				{mode === 'P_transfer' ? <td>BDO Transfer</td> : <td>Payment on Pickup</td>}
				<td>{date}</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>{instruction}<br />{description}</td>
				<td><button onClick={() => this.paid(person, order)}>Confirm</button></td>
				<td><button onClick={() => this.done(person, order)}>Complete</button></td>
				<td><button onClick={() => this.remove(person, order, object)}>Remove</button></td>
			</tr>
		)
		this.setState({ orders: row })
	}

	addDeliveryInfo = (name, number, products, amount, mode, date, address, city, route, instruction, description, person, order) => {
		let object = order
		var row = this.state.orders.concat(
			<tr id={object}>
				<td>{name}<br />{number}</td>
				<td>{products}</td>
				<td>P{amount}.00</td>
				{mode === 'D_transfer' ? <td>BDO Transfer</td> : <td>Cash on Delivery</td>}
				<td>{date}</td>
				<td>{address}</td>
				<td>{city}</td>
				{route === 'Route1' ? <td>Route 1<br />Mon, Thurs</td> : null}
				{route === 'Route2' ? <td>Route 2<br />Tues, Fri</td> : null}
				{route === 'Route3' ? <td>Route 3<br />Wed</td> : null}
				<td>{instruction}<br />{description}</td>
				<td><button onClick={() => this.paid(person, order)}>Confirm</button></td>
				<td><button onClick={() => this.done(person, order)}>Complete</button></td>
				<td><button onClick={() => this.remove(person, order, object)}>Remove</button></td>
			</tr>
		)
		this.setState({ orders: row })
	}

	//table button functions
	paid = (customer, order) => firebase.database().ref('rolls').child(customer).child(order).child('Order Details').update({ paymentStatus: this.state.paymentStatus })

	done = (customer, order) => firebase.database().ref('rolls').child(customer).child(order).child('Order Details').update({ orderStatus: this.state.orderStatus })

	remove = (customer, order, item) => {
		document.getElementById(item).remove()
		firebase.database().ref('rolls').child(customer).child(order).remove()
	}
	
	//stock toggle functions
	p1Stock = (event) => firebase.database().ref('products').child('P1').update({ Stock: true })
	p1NoStock = (event) => firebase.database().ref('products').child('P1').update({ Stock: false })

	p2Stock = (event) => firebase.database().ref('products').child('P2').update({ Stock: true })
	p2NoStock = (event) => firebase.database().ref('products').child('P2').update({ Stock: false })

	render() {
		const Orders = this.state.orders.map(item => item)

		return (
			<div>
				<section id="viewing">
					<div class="container">

						<div class="toggle">
							<p>Cinammon Rolls - 6pcs</p>
							<button onClick={this.p1Stock}>In Stock</button>
							<button onClick={this.p1NoStock}>Without Stock</button>

							<p>Cinammon Rolls - 12pcs</p>
							<button onClick={this.p2Stock}>In Stock</button>
							<button onClick={this.p2NoStock}>Without Stock</button>
						</div>

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
							      	<th>Instructions</th>
							      	<th>Payment</th>
							      	<th></th>
							      	<th></th>
							    </tr>
						  	</thead>
							<tbody id="dataTable">{Orders}</tbody>
						</table>
					</div>
				</section>
			</div>
		)
	}
}

export default Controls