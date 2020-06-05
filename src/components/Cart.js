import React, { Component } from 'react'
import * as firebase from 'firebase'
import Order from '../components/OrderForm'


class Cart extends Component {
	state = {
		consumer: this.props.consumer,
		pendingOrders: [],

		orders: [],
		doneOrders: [],
		items: [],

		showPending: true,
		showPurchased: false,
		displayForm: false
	}

	componentDidMount = async () => {
		this.displayPendingOrders()
		this.displayFinishedOrders()

		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			let pendingOrders = []
			snapshot.forEach((snap) => { pendingOrders.push(snap.val() + ' ' + snap.key) })
			this.setState({ pendingOrders })
		})
	}

	displayPendingOrders = () => {
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
							if (details.val().orderStatus === 'Not Ready') {
								if (details.val().Mode === 'Pickup') {
									this.getPendingPickupInfo(this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().orderStatus, details.val().PickupPayment, details.val().Date, details.val().paymentStatus)
								}
								else if (details.val().Mode === 'Delivery') {
									this.getPendingDeliveryInfo(this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().orderStatus, details.val().DeliveryPayment, details.val().Address, details.val().Date, details.val().paymentStatus)
								}
							}
							else { return }
						})	
					})
				}
			})
		})	
	}

	getPendingPickupInfo = (products, price, orderStatus, mode, date, paymentStat) => {
		var row = this.state.orders.concat(
			<tr>
				<td>Classic Cinammon Rolls: {products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'P_transfer' ? <td>Payment Method: BDO Transfer <br /> Date of Pickup: {date} </td> : <td>Payment Method: Payment on Pickup <br /> Date of Pickup: {date} </td>}	
			</tr>
		)
		this.setState({ orders: row })
	}

	getPendingDeliveryInfo = (products, price, orderStatus, mode, address, date, paymentStat) => {
		var row = this.state.orders.concat(
			<tr>
				<td>Classic Cinammon Rolls: {products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'D_transfer' ? <td>Payment Method: BDO Transfer <br /> Address: {address} <br /> Date of Delivery: {date} </td> : <td>Payment Method: Cash on Delivery  <br /> Address: {address} <br /> Date of Delivery: {date} </td>}
			</tr>
		)
		this.setState({ orders: row })
	}

	//display finished orders
	displayFinishedOrders = () => {
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
							if (details.val().orderStatus === 'Ready') {
								if (details.val().Mode === 'Pickup') {
									this.getFinishedPickupInfo(this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().orderStatus, details.val().PickupPayment, details.val().Date, details.val().paymentStatus)
								}
								else if (details.val().Mode === 'Delivery') {
									this.getFinishedDeliveryInfo(this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().orderStatus, details.val().DeliveryPayment, details.val().Address, details.val().Date, details.val().paymentStatus)
								}
							}
							else { return }
						})	
					})
				}
			})
		})	
	}

	getFinishedPickupInfo = (products, price, orderStatus, mode, date, paymentStat) => {
		var row = this.state.doneOrders.concat(
			<tr>
				<td>Classic Cinammon Rolls: {products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'P_transfer' ? <td>Payment Method: BDO Transfer <br /> Date of Pickup: {date} </td> : <td>Payment Method: Payment on Pickup <br /> Date of Pickup: {date} </td>}	
			</tr>
		)
		this.setState({ doneOrders: row })
	}

	getFinishedDeliveryInfo = (products, price, orderStatus, mode, address, date, paymentStat) => {
		var row = this.state.doneOrders.concat(
			<tr>
				<td>Classic Cinammon Rolls: {products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'D_transfer' ? <td>Payment Method: BDO Transfer <br /> Address: {address} <br /> Date of Delivery: {date} </td> : <td>Payment Method: Cash on Delivery  <br /> Address: {address} <br /> Date of Delivery: {date} </td>}
			</tr>
		)
		this.setState({ doneOrders: row })
	}

	remove = (id) => firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').child(id).remove()

	goOrder = (event) => {
		event.preventDefault()
		this.setState({ displayForm: true })
	}

	render() {
		const Processed = this.state.doneOrders.map(item => item)
		const Processing = this.state.orders.map(item => item)

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
				<section id="cart">
					<div class="container slideDown">

						{this.state.showPending ? 
							<div class="slideRight">
								<div id="pendingHeader"> <h1>Pending Orders</h1> </div>

								<div class="table">
									<table class="customerTable">
									  	<thead>
										    <tr>
										        <th>Order</th>
										      	<th>Total Amount</th>
										      	<th>Order Status</th>
										      	<th>Payment Status</th>
										      	<th>Details</th>
										    </tr>
									  	</thead>
										<tbody>
											{this.state.orders.length > 0 ? Processing : <th></th>}
										</tbody>
									</table>
								</div>

								<button onClick={() => this.setState({showPending: false, showPurchased: true})} class="tableButton">Show Purchased Orders</button>
							</div>
						: null}

						{this.state.showPurchased ? 
							<div class="slideRight">
								<div id="pendingHeader"> <h1>Purchased Orders</h1> </div>

								<div class="table">
									<table class="customerTable">
									  	<thead>
										    <tr>
										        <th>Order</th>
										      	<th>Total Amount</th>
										      	<th>Order Status</th>
										      	<th>Payment Status</th>
										      	<th>Details</th>
										    </tr>
									  	</thead>
										<tbody>
											{this.state.doneOrders.length > 0 ? Processed : <th></th>}
										</tbody>
									</table>
								</div>

								<button onClick={() => this.setState({showPending: true, showPurchased: false})} class="tableButton">Show Pending Orders</button>
							</div>
						: null}

						<div id="cartHeader"> <h1>Cart</h1> </div>
						<div class="table">
							<table class="customerTable">
							  	<thead>
								    <tr>
								        <th>Item</th>
								      	<th>Pieces</th>
								      	<th>Price</th>
								      	<th></th>
								    </tr>
							  	</thead>
								<tbody>
									{this.state.pendingOrders.length > 0 ? Pending : <th></th>}
								</tbody>
							</table>
						</div>

						<button onClick={this.goOrder} id="checkoutButton">Checkout</button>
						{this.state.displayForm ? <a href="#orderDetails"><img class="downArrow" src="https://image.flaticon.com/icons/svg/2316/2316598.svg" /></a> : null}
					</div>
				</section>
				
				{this.state.displayForm ? <Order consumer={this.props.consumer} /> : null}
			</div>
		)
	}
}

export default Cart