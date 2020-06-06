import React, { Component } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addMonths, getDay } from 'date-fns'
import moment from 'moment'


class Controls extends Component {
	state = {
		allOrders: [],
		pickupOrders: [],
		deliveryOrders: [],

		person: '',
		purchase: '',
		items: [],
		instructions: [],

		paymentStatus: 'Payment Confirmed',
		orderStatus: 'Ready',
		contacted: true,

		methodFilter: '',
		dateFilter: '',
		maxDeliveries: 0,
		searchOrder: ''
	}

	logout = (event) => {
		const confirm = window.confirm('Are you sure you would like to logout?')
		if (confirm) { firebase.auth().signOut() }
	}

	componentDidMount = async () => {
		this.allData()
		this.pickup()
		this.delivery()
	}

	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	handleOrderChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })

		this.setState({ allOrders: [] })

		this.allData()
	}

	handleDateChange = (date) => {
		this.setState({ allOrders: [], pickupOrders: [], deliveryOrders: [], dateFilter: date })

		this.allData()
		this.pickup()
		this.delivery()
	}

	//display all the data 
	allData = () => {
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

					if (order.hasChild('Order Instructions')) {
						order.child('Order Instructions').forEach((information) => {
							let instructions = []
							information.forEach((info) => { instructions.push(info.val()) })
							this.setState({ instructions })
						})
					}
					else if (!order.hasChild('Order Instructions')) {
						let instructions = []
						this.setState({ instructions })
					}

					//append all the details from 'Order Details' to the specified functions
					order.forEach((details) => {
						if (this.state.searchOrder.trim() === '') {
							if (this.state.dateFilter === '') {
								if (details.val().orderStatus === 'Not Ready') {
									if (details.val().Mode === 'Pickup') {
										this.addPickupInfo_All(details.val().Name, details.val().Number, this.state.items.map(item => {
											if (item === 'P1') { return <p>6pcs</p> }
											else if (item === 'P2') { return <p>12pcs</p> }
										}), details.val().Price, details.val().PickupPayment, details.val().Date, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
											if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
											else if (item === 'Personalized') { return <p>Personalized Writing</p> }
											else if (item === 'Candle') { return <p>Candle</p> }
											else if (item === 'Frosting') { return <p>Separate Frosting</p> }
											else if (item === 'None') { return <p>None</p> }
										}))
									}
									else if (details.val().Mode === 'Delivery') {
										this.addDeliveryInfo_All(details.val().Name, details.val().Number, this.state.items.map(item => {
											if (item === 'P1') { return <p>6pcs</p> }
											else if (item === 'P2') { return <p>12pcs</p> }
										}), details.val().Price, details.val().DeliveryPayment, details.val().Date, details.val().Address, details.val().City, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
											if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
											else if (item === 'Personalized') { return <p>Personalized Writing</p> }
											else if (item === 'Candle') { return <p>Candle</p> }
											else if (item === 'Frosting') { return <p>Separate Frosting</p> }
											else if (item === 'None') { return <p>None</p> }
										}))
									}
								}
								else if (details.val().orderStatus === 'Ready') { return }
							}
							else if (this.state.dateFilter !== '') {
								if (details.val().Date === moment(this.state.dateFilter).format('L')) {
									if (details.val().Mode === 'Pickup') {
										this.addPickupInfo_All(details.val().Name, details.val().Number, this.state.items.map(item => {
											if (item === 'P1') { return <p>6pcs</p> }
											else if (item === 'P2') { return <p>12pcs</p> }
										}), details.val().Price, details.val().PickupPayment, details.val().Date, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
											if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
											else if (item === 'Personalized') { return <p>Personalized Writing</p> }
											else if (item === 'Candle') { return <p>Candle</p> }
											else if (item === 'Frosting') { return <p>Separate Frosting</p> }
											else if (item === 'None') { return <p>None</p> }
										}))
									}
									else if (details.val().Mode === 'Delivery') {
										this.addDeliveryInfo_All(details.val().Name, details.val().Number, this.state.items.map(item => {
											if (item === 'P1') { return <p>6pcs</p> }
											else if (item === 'P2') { return <p>12pcs</p> }
										}), details.val().Price, details.val().DeliveryPayment, details.val().Date, details.val().Address, details.val().City, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
											if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
											else if (item === 'Personalized') { return <p>Personalized Writing</p> }
											else if (item === 'Candle') { return <p>Candle</p> }
											else if (item === 'Frosting') { return <p>Separate Frosting</p> }
											else if (item === 'None') { return <p>None</p> }
										}))
									}
								}
								else if (details.val().Date !== moment(this.state.dateFilter).format('L')) { return }
							}
						}
						else if (this.state.searchOrder.trim() !== '') {
							if (this.state.purchase === this.state.searchOrder) {
								if (details.val().Mode === 'Pickup') {
									this.addPickupInfo_All(details.val().Name, details.val().Number, this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().PickupPayment, details.val().Date, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
										if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
										else if (item === 'Personalized') { return <p>Personalized Writing</p> }
										else if (item === 'Candle') { return <p>Candle</p> }
										else if (item === 'Frosting') { return <p>Separate Frosting</p> }
										else if (item === 'None') { return <p>None</p> }
									}))
								}
								else if (details.val().Mode === 'Delivery') {
									this.addDeliveryInfo_All(details.val().Name, details.val().Number, this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().DeliveryPayment, details.val().Date, details.val().Address, details.val().City, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
										if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
										else if (item === 'Personalized') { return <p>Personalized Writing</p> }
										else if (item === 'Candle') { return <p>Candle</p> }
										else if (item === 'Frosting') { return <p>Separate Frosting</p> }
										else if (item === 'None') { return <p>None</p> }
									}))
								}
							}
							else if (this.state.purchase !== this.state.searchOrder) { return }
						}
					})	
				})
			})
		})	
	}

	addPickupInfo_All = (name, number, products, amount, mode, date, instruction, description, person, order, paymentStat, orderStat, contactStat, frostingInstruct, multipleInstructions) => {
		let object = order
		var row = this.state.allOrders.concat(
			<tr id={object}>
				<td>{name}<br />{number}<br /><br />{order}</td>
				<td>{products}</td>
				<td>P{amount}.00</td>
				{mode === 'P_transfer' ? <td>BDO Transfer</td> : <td>Payment on Pickup</td>}
				<td>{date}</td>
				<td>-</td>
				<td>-</td>
				<td>{instruction} {multipleInstructions}<br />{description}<br />{frostingInstruct}</td>
				<td>
					<button style={{background: paymentStat === 'Payment Confirmed' ? '#B2773C' : null}} id="paid" onClick={() => this.paid(person, order)} disabled={paymentStat === this.state.paymentStatus}>Confirm</button>
				    <button style={{background: orderStat === 'Ready' ? '#B2773C' : null}} id="done" onClick={() => this.done(person, order, object)} disabled={orderStat === this.state.orderStatus}>Complete</button>
				    <button style={{background: contactStat === true ? '#B2773C' : null}} id="contact" onClick={() => this.contact(person, order)} disabled={contactStat === this.state.contacted}>Contacted</button>
					<button onClick={() => this.remove(person, order, object)}>Remove</button>
				</td>
			</tr>
		)
		this.setState({ allOrders: row })
	}

	addDeliveryInfo_All = (name, number, products, amount, mode, date, address, city, instruction, description, person, order,  paymentStat, orderStat, contactStat, frostingInstruct, multipleInstructions) => {
		let object = order
		var row = this.state.allOrders.concat(
			<tr id={object}>
				<td>{name}<br />{number}<br /><br />{order}</td>
				<td>{products}</td>
				<td>P{amount}.00</td>
				{mode === 'D_transfer' ? <td>BDO Transfer</td> : <td>Cash on Delivery</td>}
				<td>{date}</td>
				<td>{address}</td>
				<td>{city}</td>
				<td>{instruction} {multipleInstructions}<br />{description}<br />{frostingInstruct}</td>
				<td>
					<button style={{background: paymentStat === 'Payment Confirmed' ? '#B2773C' : null}} id="paid" onClick={() => this.paid(person, order)} disabled={paymentStat === this.state.paymentStatus}>Confirm</button>
					<button style={{background: orderStat === 'Ready' ? '#B2773C' : null}} id="done" onClick={() => this.done(person, order, object)} disabled={orderStat === this.state.orderStatus}>Complete</button>
					<button style={{background: contactStat === true ? '#B2773C' : null}} id="contact" onClick={() => this.contact(person, order)} disabled={contactStat === this.state.contacted}>Contacted</button>
					<button onClick={() => this.remove(person, order, object)}>Remove</button>
				</td>
			</tr>
		)
		this.setState({ allOrders: row })
	}

	//display pickup orders 
	pickup = () => {
		firebase.database().ref('rolls').once('value', snapshot => {
			snapshot.forEach((snap) => {
				this.setState({ person: snap.key })
				snap.forEach((order) => {
					this.setState({ purchase: order.key })

					if (order.hasChild('Order Items')) {
						order.forEach((details) => {
							let items = []
							details.forEach((product) => { items.push(product.val()) })
							this.setState({ items })
						})
					}

					if (order.hasChild('Order Instructions')) {
						order.child('Order Instructions').forEach((information) => {
							let instructions = []
							information.forEach((info) => { instructions.push(info.val()) })
							this.setState({ instructions })
						})
					}
					else if (!order.hasChild('Order Instructions')) {
						let instructions = []
						this.setState({ instructions })
					}

					order.forEach((details) => {
						if (this.state.dateFilter === '') {
							if (details.val().orderStatus === 'Not Ready') {
								if (details.val().Mode === 'Pickup') {
									this.addPickupInfo_Pickup(details.val().Name, details.val().Number, this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().PickupPayment, details.val().Date, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
										if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
										else if (item === 'Personalized') { return <p>Personalized Writing</p> }
										else if (item === 'Candle') { return <p>Candle</p> }
										else if (item === 'Frosting') { return <p>Separate Frosting</p> }
										else if (item === 'None') { return <p>None</p> }
									}))
								}
								else if (details.val().Mode === 'Delivery') { return }
							}
							else if (details.val().orderStatus === 'Ready') { return }
						}
						else if (this.state.dateFilter !== '') {
							if (details.val().Date === moment(this.state.dateFilter).format('L')) {
								if (details.val().Mode === 'Pickup') {
									this.addPickupInfo_Pickup(details.val().Name, details.val().Number, this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().PickupPayment, details.val().Date, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
										if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
										else if (item === 'Personalized') { return <p>Personalized Writing</p> }
										else if (item === 'Candle') { return <p>Candle</p> }
										else if (item === 'Frosting') { return <p>Separate Frosting</p> }
										else if (item === 'None') { return <p>None</p> }
									}))
								}
								else if (details.val().Mode === 'Delivery') { return }
							}
							else if (details.val().Date !== moment(this.state.dateFilter).format('L')) { return }
						}	
					})	
				})
			})
		})	
	}

	addPickupInfo_Pickup = (name, number, products, amount, mode, date, instruction, description, person, order, paymentStat, orderStat, contactStat, frostingInstruct, multipleInstructions) => {
		let object = order
		var row = this.state.pickupOrders.concat(
			<tr id={object}>
				<td>{name}<br />{number}<br /><br />{order}</td>
				<td>{products}</td>
				<td>P{amount}.00</td>
				{mode === 'P_transfer' ? <td>BDO Transfer</td> : <td>Payment on Pickup</td>}
				<td>{date}</td>
				<td>-</td>
				<td>-</td>
				<td>{instruction} {multipleInstructions}<br />{description}<br />{frostingInstruct}</td>
				<td>
					<button style={{background: paymentStat === 'Payment Confirmed' ? '#B2773C' : null}} id="paid" onClick={() => this.paid(person, order)} disabled={paymentStat === this.state.paymentStatus}>Confirm</button>
				    <button style={{background: orderStat === 'Ready' ? '#B2773C' : null}} id="done" onClick={() => this.done(person, order, object)} disabled={orderStat === this.state.orderStatus}>Complete</button>
				    <button style={{background: contactStat === true ? '#B2773C' : null}} id="contact" onClick={() => this.contact(person, order)} disabled={contactStat === this.state.contacted}>Contacted</button>
					<button onClick={() => this.remove(person, order, object)}>Remove</button>
				</td>
			</tr>
		)
		this.setState({ pickupOrders: row })
	}

	//display delivery orders
	delivery = () => {
		firebase.database().ref('rolls').once('value', snapshot => {
			snapshot.forEach((snap) => {
				this.setState({ person: snap.key })
				snap.forEach((order) => {
					this.setState({ purchase: order.key })

					if (order.hasChild('Order Items')) {
						order.forEach((details) => {
							let items = []
							details.forEach((product) => { items.push(product.val()) })
							this.setState({ items })
						})
					}

					if (order.hasChild('Order Instructions')) {
						order.child('Order Instructions').forEach((information) => {
							let instructions = []
							information.forEach((info) => { instructions.push(info.val()) })
							this.setState({ instructions })
						})
					}
					else if (!order.hasChild('Order Instructions')) {
						let instructions = []
						this.setState({ instructions })
					}
					
					order.forEach((details) => {
						if (this.state.dateFilter === '') {
							if (details.val().orderStatus === 'Not Ready') {
								if (details.val().Mode === 'Delivery') {
									this.addDeliveryInfo_Delivery(details.val().Name, details.val().Number, this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().DeliveryPayment, details.val().Date, details.val().Address, details.val().City, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
										if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
										else if (item === 'Personalized') { return <p>Personalized Writing</p> }
										else if (item === 'Candle') { return <p>Candle</p> }
										else if (item === 'Frosting') { return <p>Separate Frosting</p> }
										else if (item === 'None') { return <p>None</p> }
									}))
								}
								else if (details.val().Mode === 'Pickup') { return }
							}
							else if (details.val().orderStatus === 'Ready') { return }
						}
						else if (this.state.dateFilter !== '') {
							if (details.val().Date === moment(this.state.dateFilter).format('L')) {
								if (details.val().Mode === 'Delivery') {
									this.addDeliveryInfo_Delivery(details.val().Name, details.val().Number, this.state.items.map(item => {
										if (item === 'P1') { return <p>6pcs</p> }
										else if (item === 'P2') { return <p>12pcs</p> }
									}), details.val().Price, details.val().DeliveryPayment, details.val().Date, details.val().Address, details.val().City, details.val().Instructions, details.val().Note, this.state.person, this.state.purchase, details.val().paymentStatus, details.val().orderStatus, details.val().contacted, details.val().FrostingInstructions, this.state.instructions.map(item => { 
										if (item === 'extraFrosting') { return <p>Extra Frosting</p>}
										else if (item === 'Personalized') { return <p>Personalized Writing</p> }
										else if (item === 'Candle') { return <p>Candle</p> }
										else if (item === 'Frosting') { return <p>Separate Frosting</p> }
										else if (item === 'None') { return <p>None</p> }
									}))
								}
								else if (details.val().Mode === 'Pickup') { return }
							}
							else if (details.val().Date !== moment(this.state.dateFilter).format('L')) { return }
						}	
					})	
				})
			})
		})	
	}

	addDeliveryInfo_Delivery = (name, number, products, amount, mode, date, address, city, instruction, description, person, order, paymentStat, orderStat, contactStat, frostingInstruct, multipleInstructions) => {
		let object = order
		var row = this.state.deliveryOrders.concat(
			<tr id={object}>
				<td>{name}<br />{number}<br /><br />{order}</td>
				<td>{products}</td>
				<td>P{amount}.00</td>
				{mode === 'D_transfer' ? <td>BDO Transfer</td> : <td>Cash on Delivery</td>}
				<td>{date}</td>
				<td>{address}</td>
				<td>{city}</td>
				<td>{instruction} {multipleInstructions}<br />{description}<br />{frostingInstruct}</td>
				<td>
					<button style={{background: paymentStat === 'Payment Confirmed' ? '#B2773C' : null}} id="paid" onClick={() => this.paid(person, order)} disabled={paymentStat === this.state.paymentStatus}>Confirm</button>
					<button style={{background: orderStat === 'Ready' ? '#B2773C' : null}} id="done" onClick={() => this.done(person, order, object)} disabled={orderStat === this.state.orderStatus}>Complete</button>
					<button style={{background: contactStat === true ? '#B2773C' : null}} id="contact" onClick={() => this.contact(person, order)} disabled={contactStat === this.state.contacted}>Contacted</button>
					<button onClick={() => this.remove(person, order, object)}>Remove</button>
				</td>
			</tr>
		)
		this.setState({ deliveryOrders: row })
	}

	//table button functions
	paid = (customer, order) => {
		firebase.database().ref('rolls').child(customer).child(order).child('Order Details').update({ paymentStatus: this.state.paymentStatus })
		document.getElementById(order).querySelector('#paid').style.backgroundColor = "#B2773C"
	}

	done = (customer, order, item) => { 
		firebase.database().ref('rolls').child(customer).child(order).child('Order Details').update({ orderStatus: this.state.orderStatus })
		document.getElementById(item).style.display = 'none'
		document.getElementById(order).querySelector('#done').style.backgroundColor = "#B2773C"
	}

	contact = (customer, order) => {
		firebase.database().ref('rolls').child(customer).child(order).child('Order Details').update({ contacted: this.state.contacted })
		document.getElementById(order).querySelector('#contact').style.backgroundColor = "#B2773C"
	}

	remove = (customer, order, item) => {
		document.getElementById(item).style.display = 'none'
		firebase.database().ref('rolls').child(customer).child(order).remove()
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
		else {
			alert("Please input an integer greater or equal to 0.")
		}
	}

	render() {
		const All = this.state.allOrders.map(item => item)
		const Pickup = this.state.pickupOrders.map(item => item)
		const Delivery = this.state.deliveryOrders.map(item => item)

		return (
			<div>
				<section id="viewing">
					<div class="container slideDown">

						<div id="adminHeader"> <h1>Admin Panel</h1> </div>

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

						<div class="filter">
							<select onChange={this.handleChange} value={this.state.methodFilter} name="methodFilter">
								<option value="">--Choose Filter--</option>
								<option value="delivery">Deliveries</option>
								<option value="pickup">Pickups</option>
							</select>

							<input onChange={this.handleOrderChange} value={this.state.searchOrder} name="searchOrder" type="text" placeholder="Search Order" autocomplete="off" />

							<DatePicker inline selected={this.state.dateFilter} onChange={date => this.handleDateChange(date)} maxDate={addMonths(new Date(), 2)} format='MM-dd-yyyy' placeholderText="Date" id="filterPicker" />
						</div>

						<div class="table">
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
								      	<th>Instructions</th>
								      	<th></th>
								    </tr>
							  	</thead>

							  	<tbody id="dataTable">
							  		{this.state.methodFilter === '' ? All : null}
							  		{this.state.methodFilter === 'pickup' ? Pickup : null}
							  		{this.state.methodFilter === 'delivery' ? Delivery : null}
							  	</tbody>
									
							</table>
						</div>

						<button onClick={this.logout} id="logoutBtn">Logout</button>

					</div>
				</section>
			</div>
		)
	}
}

export default Controls