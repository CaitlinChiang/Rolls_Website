import React, { Component } from 'react'
import * as firebase from 'firebase'
import Order from '../components/OrderForm'


class Cart extends Component {
	state = {
		consumer: this.props.consumer,
		orderNumber: '',

		pendingOrders: [],
		orders: [],
		doneOrders: [],
		items: [],

		showPending: true,
		showPurchased: false,
		displayForm: false
	}

	componentDidMount = async () => {
		this.displayCartOrders()
		this.displayPendingOrders()
		this.displayFinishedOrders()

		setInterval(() => { this.displayPendingOrders() }, 100)
	}

	//display cart orders
	displayCartOrders = () => {
		this.setState({ pendingOrders: [] })

		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').once('value', snapshot => {
			snapshot.forEach((snap) => {
				this.getCartOrderInfo(snap.key, snap.val().Product, snap.val().Sets, snap.val().Price)
			})
		})
	}

	getCartOrderInfo = (id_Num, products, quantity, price) => {
		var row = this.state.pendingOrders.concat(
			<tr id={id_Num}>
				{products === 'P1' ? <td>6pcs Classic Cinammon Rolls</td> : null}
				{products === 'P2' ? <td>12pcs Classic Cinammon Rolls</td> : null}
				{products === 'P3' ? <td>6pcs Double Chocolate Cinammon Rolls</td> : null}
				{products === 'P4' ? <td>12pcs Double Chocolate Cinammon Rolls</td> : null}
				{products === 'P5' ? <td>6pcs Caramel Pecan Rolls</td> : null}
				{products === 'P6' ? <td>12pcs Caramel Pecan Rolls</td> : null}
				{products === 'P7' ? <td>Classic Cinnacake</td> : null}
				{products === 'P8' ? <td>Chocolate Cinnacake</td> : null}
				{products === 'P9' ? <td>Caramel Pecan Cinnacake</td> : null}
				{products === 'P10' ? <td>6pcs Matcha Cinammon Rolls</td> : null}
				{products === 'P11' ? <td>Matcha Cinnacake</td> : null}
				{products === 'P12' ? <td>12pcs PB&J</td> : null}
				{products === 'P13' ? <td>6pcs PB&J</td> : null}
				{products === 'P14' ? <td>12pcs Double Strawberry</td> : null}
				{products === 'P15' ? <td>6pcs Double Strawberry</td> : null}
				{products === 'P16' ? <td>12pcs Strawberries and Cream Cheese</td> : null}
				{products === 'P17' ? <td>6pcs Strawberries and Cream Cheese</td> : null}
				<td>{quantity}</td>
				<td>P{price}.00</td>
				<td><button onClick={() => this.remove(id_Num)}>Remove</button></td>
			</tr>
		)
		this.setState({ pendingOrders: row })
	}

	remove = (id) => {
		document.getElementById(id).style.display = 'none'
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').child(id).remove()
		this.displayCartOrders()
	}

	//display pending orders
	displayPendingOrders = () => {
		this.setState({ orders: [] })

		firebase.database().ref('rolls').on('value', snapshot => {
			snapshot.forEach((snap) => {
				if (snap.key === this.state.consumer) {
					snap.forEach((order) => {
					this.setState({ orderNumber: order.key })

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
										else if (item !== 'P1' || item !== 'P2') { 
											return (
												<div>
													{item.Product === 'P1' ? <p>6pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P2' ? <p>12pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P3' ? <p>6pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P4' ? <p>12pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P5' ? <p>6pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P6' ? <p>12pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P7' ? <p>Classic Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P8' ? <p>Chocolate Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P9' ? <p>Caramel Pecan Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P10' ? <p>6pcs Matcha Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P11' ? <p>Matcha Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P12' ? <td>12pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P13' ? <td>6pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P14' ? <td>12pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P15' ? <td>6pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P16' ? <td>12pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P17' ? <td>6pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
												</div>
											)
										}
									}), details.val().Price, details.val().orderStatus, details.val().PickupPayment, details.val().Date, details.val().paymentStatus, this.state.orderNumber)
								}
								else if (details.val().Mode === 'Delivery') {
									this.getPendingDeliveryInfo(this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
										else if (item !== 'P1' || item !== 'P2') { 
											return (
												<div>
													{item.Product === 'P1' ? <p>6pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P2' ? <p>12pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P3' ? <p>6pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P4' ? <p>12pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P5' ? <p>6pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P6' ? <p>12pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P7' ? <p>Classic Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P8' ? <p>Chocolate Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P9' ? <p>Caramel Pecan Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P10' ? <p>6pcs Matcha Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P11' ? <p>Matcha Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P12' ? <td>12pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P13' ? <td>6pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P14' ? <td>12pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P15' ? <td>6pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P16' ? <td>12pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P17' ? <td>6pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
												</div>
											)
										}
									}), details.val().Price, details.val().orderStatus, details.val().DeliveryPayment, details.val().Address, details.val().Date, details.val().paymentStatus, this.state.orderNumber)
								}
							}
							else { return }
						})	
					})
				}
			})
		})	
	}

	getPendingPickupInfo = (products, price, orderStatus, mode, date, paymentStat, order) => {
		var row = this.state.orders.concat(
			<tr>
				<td>{order}</td>
				<td>{products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'P_transfer' ? <td>Payment Method: BDO Transfer <br /> Date of Pickup: {date} </td> : null }	
				{mode === 'P_GCash' ? <td>Payment Method: GCash <br /> Date of Pickup: {date} </td> : null }
				{mode === 'payOnPickup' ? <td>Payment Method: Payment on Pickup <br /> Date of Pickup: {date} </td> : null}
			</tr>
		)
		this.setState({ orders: row })
	}

	getPendingDeliveryInfo = (products, price, orderStatus, mode, address, date, paymentStat, order) => {
		var row = this.state.orders.concat(
			<tr>
				<td>{order}</td>
				<td>{products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'D_transfer' ? <td>Payment Method: BDO Transfer <br /> Address: {address} <br /> Date of Delivery: {date} </td> : null}
				{mode === 'cod' ? <td>Payment Method: Cash on Delivery  <br /> Address: {address} <br /> Date of Delivery: {date} </td> : null}
				{mode === 'D_GCash' ? <td>Payment Method: GCash <br /> Address: {address} <br /> Date of Delivery: {date} </td> : null}
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
					this.setState({ orderNumber: order.key })

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
										else if (item !== 'P1' || item !== 'P2') { 
											return (
												<div>
													{item.Product === 'P1' ? <p>6pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P2' ? <p>12pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P3' ? <p>6pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P4' ? <p>12pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P5' ? <p>6pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P6' ? <p>12pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P7' ? <p>Classic Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P8' ? <p>Chocolate Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P9' ? <p>Caramel Pecan Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P10' ? <p>6pcs Matcha Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P11' ? <p>Matcha Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P12' ? <td>12pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P13' ? <td>6pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P14' ? <td>12pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P15' ? <td>6pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P16' ? <td>12pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P17' ? <td>6pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
												</div>
											)
										}
									}), details.val().Price, details.val().orderStatus, details.val().PickupPayment, details.val().Date, details.val().paymentStatus, this.state.orderNumber)
								}
								else if (details.val().Mode === 'Delivery') {
									this.getFinishedDeliveryInfo(this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
										else if (item !== 'P1' || item !== 'P2') { 
											return (
												<div>
													{item.Product === 'P1' ? <p>6pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P2' ? <p>12pcs Classic Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P3' ? <p>6pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P4' ? <p>12pcs Double Chocolate Cinammon Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P5' ? <p>6pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P6' ? <p>12pcs Caramel Pecan Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P7' ? <p>Classic Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P8' ? <p>Chocolate Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P9' ? <p>Caramel Pecan Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P10' ? <p>6pcs Matcha Rolls (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P11' ? <p>Matcha Cinnacake (Quantity: {item.Sets})</p> : null}
													{item.Product === 'P12' ? <td>12pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P13' ? <td>6pcs PB&J (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P14' ? <td>12pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P15' ? <td>6pcs Double Strawberry (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P16' ? <td>12pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
													{item.Product === 'P17' ? <td>6pcs Strawberries and Cream Cheese (Quantity: {item.Sets})</td> : null}
												</div>
											)
										}
									}), details.val().Price, details.val().orderStatus, details.val().DeliveryPayment, details.val().Address, details.val().Date, details.val().paymentStatus, this.state.orderNumber)
								}
							}
							else { return }
						})	
					})
				}
			})
		})	
	}

	getFinishedPickupInfo = (products, price, orderStatus, mode, date, paymentStat, order) => {
		var row = this.state.doneOrders.concat(
			<tr>
				<td>{order}</td>
				<td>{products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'P_transfer' ? <td>Payment Method: BDO Transfer <br /> Date of Pickup: {date} </td> : null }	
				{mode === 'P_GCash' ? <td>Payment Method: GCash <br /> Date of Pickup: {date} </td> : null }
				{mode === 'payOnPickup' ? <td>Payment Method: Payment on Pickup <br /> Date of Pickup: {date} </td> : null}	
			</tr>
		)
		this.setState({ doneOrders: row })
	}

	getFinishedDeliveryInfo = (products, price, orderStatus, mode, address, date, paymentStat, order) => {
		var row = this.state.doneOrders.concat(
			<tr>
				<td>{order}</td>
				<td>{products}</td>
				<td>P{price}.00</td>
				<td>{orderStatus}</td>
				{paymentStat === 'Payment Pending' ? <td>Not Paid</td> : <td>Paid</td>}
				{mode === 'D_transfer' ? <td>Payment Method: BDO Transfer <br /> Address: {address} <br /> Date of Delivery: {date} </td> : null}
				{mode === 'cod' ? <td>Payment Method: Cash on Delivery  <br /> Address: {address} <br /> Date of Delivery: {date} </td> : null}
				{mode === 'D_GCash' ? <td>Payment Method: GCash <br /> Address: {address} <br /> Date of Delivery: {date} </td> : null}
			</tr>
		)
		this.setState({ doneOrders: row })
	}

	goOrder = (event) => {
		event.preventDefault()
		this.setState({ displayForm: true })
	}

	render() {
		const Process    = this.state.pendingOrders.map(item => item)
		const Processed  = this.state.doneOrders.map(item => item)
		const Processing = this.state.orders.map(item => item)

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
										    	<th>Order Number</th>
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
										    	<th>Order Number</th>
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
								        <th>Order</th>
								      	<th>Order Quantity</th>
								      	<th>Price</th>
								      	<th></th>
								    </tr>
							  	</thead>
								<tbody>
									{this.state.pendingOrders.length > 0 ? Process : <th></th>}
								</tbody>
							</table>
						</div>

						<button onClick={this.goOrder} id="checkoutButton">Checkout</button>
						{this.state.displayForm ? <a href="#orderDetails"><img class="downArrow" src="https://image.flaticon.com/icons/svg/2316/2316598.svg" /></a> : null}
					</div>
				</section>

				<div class="warning">
					<p>**When running into issues or glitches, kindly refresh the page.**</p>
				</div>
				
				{this.state.displayForm ? <Order consumer={this.props.consumer} displayPendingOrders={this.displayPendingOrders} /> : null}
			</div>
		)
	}
}

export default Cart