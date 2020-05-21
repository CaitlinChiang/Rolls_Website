import React, { Component } from 'react'
import * as firebase from 'firebase'


class Order extends Component {
	state = {
		consumer: this.props.consumer,    pendingOrders: [],       price: 0,

		name: '',       number: '',       mode: '',       

		pDate: '',      pPayment: '',
		
		dPayment: '',   address: '',      city: '',       dDate: '',       route: ''
	}

	componentDidMount = async () => {
		this.displayTotal()
		setInterval(this.displayTotal, 500)

		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			let pendingOrders = []
			snapshot.forEach((snap) => { pendingOrders.push(snap.val()) })
			this.setState({ pendingOrders })
		})
	}

	displayTotal = () => {
		this.setState({ price: 0 })
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			snapshot.forEach((snap) => {
				if (snap.val() === 'P1') {
					this.setState(prevState => ({ price: prevState.price + 60 }))
				}
				else if (snap.val() === 'P2') {
					this.setState(prevState => ({ price: prevState.price + 350 }))
				}
				else if (snap.val() === 'P3') {
					this.setState(prevState => ({ price: prevState.price + 600 }))
				}
			})
		})
	}

	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	//include city fee

	moveOrderRecord = () => {
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').once('value', snapshot => {
			firebase.database().ref(`users/${this.state.consumer}`).child('Delivered Orders').update( snapshot.val(), () => {
				firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').remove()
			})
		})
	}

	getDate = () => {
		let newDate = new Date()

		let dateToday = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		let hour = newDate.getHours();
		let min = newDate.getMinutes();
		let sec = newDate.getSeconds();

		return month + "-" + dateToday + "-" + year + "||" + hour + ":" + min + ":" + sec
	}

	updateRolls = () => {
		let today = this.getDate()
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').once('value', snapshot => {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order: ${today}`).child('Order Items').set( snapshot.val() )
		})

		if (this.state.mode === 'Pickup') {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order: ${today}`).child('Order Details').set({
				Name: this.state.name,
				Number: this.state.number,
				Mode: this.state.mode,
				PickupDate: this.state.pDate,
				PickupPayment: this.state.pPayment
			})
		}
		else if (this.state.mode == 'Delivery') {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order: ${today}`).child('Order Details').set({
				Name: this.state.name,
				Number: this.state.number,
				Mode: this.state.mode,
				DeliveryPayment: this.state.dPayment,
				Address: this.state.address,
				City: this.state.city,
				DeliveryDate: this.state.dDate
			})
		}
	}

	clearFields = () => {
		this.setState({
			name: '',       number: '',       mode: '',

			pDate: '',      pPayment: '',
			
			dPayment: '',   address: '',      city: '',       dDate: ''
		})
	}

	order = (event) => {
		event.preventDefault()
		if (this.state.pendingOrders && this.state.pendingOrders.length > 0) {
			if (this.state.mode === 'Pickup') {
				if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.mode.trim() !== "" && this.state.pDate.trim() !== "" && this.state.pPayment.trim() !== "") {
					const confirm = window.confirm('Confirm your purchase?')
					if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }
				}
				else { alert("Please fill in all input fields.") }
			}
			else if (this.state.mode === 'Delivery') {
				if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.mode.trim() !== "" && this.state.dPayment.trim() !== "" && this.state.address.trim() !== "" && this.state.city.trim() !== "" && this.state.dDate.trim() !== "") {
					const confirm = window.confirm('Confirm your purchase?')
					if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }				
				}
				else { alert("Please fill in all the input fields.") }
			}
		}
		else { alert("Your cart is empty.") }
 	}

	render() {
		return (
			<section id="orderDetails">
				<div class="container">
					<h1>ORDER</h1>
					<form autocomplete="off">
						<div class="identity">
							<input onChange={this.handleChange} value={this.state.name} name="name" type="text" placeholder="Name" />
							<input onChange={this.handleChange} value={this.state.number} name="number" type="text" placeholder="Number" />
						</div>

						<div class="mode">
							<select onChange={this.handleChange} value={this.state.mode} name="mode">
								<option value="">--Select Receive Method--</option>
								<option value="Pickup">Pick Up</option>
								<option value="Delivery">Delivery</option>
							</select>
						</div>

						<div class="showcase">
							{this.state.mode === 'Pickup' ? 
								<div id="pickupForm">
									<label><input onChange={this.handleChange} value={this.state.pDate} name="pDate" type="date" placeholder="dd/mm/yyyy" /></label>
									<select onChange={this.handleChange} value={this.state.pPayment} name="pPayment">
										<option value="">--Payment Method--</option>
										<option value="payOnPickup">Pay on Pickup</option>
										<option value="P_transfer">BDO Bank Transfer</option>
									</select>
								</div>
							: null}

							{this.state.mode === 'Delivery' ?
								<div id="deliveryForm">
									<select onChange={this.handleChange} value={this.state.dPayment} name="dPayment">
										<option value="">--Payment Method--</option>
										<option value="cod">Cash on Delivery</option>
										<option value="D_transfer">BDO Bank Transfer</option>
									</select>
									<input onChange={this.handleChange} value={this.state.address} name="address" type="text" placeholder="Address" />
									
									<select name="city" value={this.state.city} onChange={this.handleChange}>
										<option value="">--Select City--</option>
										<option value="Caloocan">Caloocan</option>
										<option value="LasPinas">Las Pinas</option>
										<option value="Makati">Makati</option>
										<option value="Malabon">Malabon</option>
										<option value="Mandaluyong">Mandaluyong</option>
										<option value="Manila">Manila</option>
										<option value="Marikina">Marikina</option>
										<option value="Muntinlupa">Muntinlupa</option>
										<option value="Navotas">Navotas</option>
										<option value="Paranaque">Paranaque</option>
										<option value="Pasig">Pasig</option>
										<option value="Quezon">Quezon</option>
										<option value="SanJuan">San Juan</option>
										<option value="Valenzuela">Valenzuela</option>
									</select>

									<label><input onChange={this.handleChange} value={this.state.dDate} name="dDate" type="date" placeholder="dd/mm/yyyy" /></label>
								</div>
							: null}
						</div>		
						
						<div>
							<p>Total: {this.state.price}</p>
							<button onClick={this.order}>Order</button>
						</div>
					</form>
				</div>
			</section>
		)
	}
}

export default Order