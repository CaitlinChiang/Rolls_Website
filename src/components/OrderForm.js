import React, { Component } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, addMonths, getDay } from 'date-fns'


class Order extends Component {
	state = {
		consumer: this.props.consumer,    pendingOrders: [],       price: 0,

		name: '',       number: '',       mode: '',

		pDate: '',      pPayment: '',     pInstructions: '',       pNote: '',
		
		dPayment: '',   address: '',      city: '',                dDate: '',       route: '',       dInstructions: '',       dNote: '',

		orderStatus: 'Not Ready',         paymentStatus: 'Payment Pending'
	}

	componentDidMount = async () => {
		setInterval(() => { this.displayTotal(); this.cityFee(); this.instructionFee() }, 100)

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
					this.setState(prevState => ({ price: prevState.price + 350 }))
				}
				else if (snap.val() === 'P2') {
					this.setState(prevState => ({ price: prevState.price + 600 }))
				}
			})
		})
	}

	cityFee = () => {
		if (this.state.mode === 'Delivery') {
			if (this.state.city === '') {
				this.setState(prevState => ({ price: prevState.price + 0 }))
			} else if (this.state.city === 'Cainta') {
				this.setState(prevState => ({ price: prevState.price + 220 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'Caloocan') {
				this.setState(prevState => ({ price: prevState.price + 212 }))
				this.setState({ route: 'Route1'})
			} else if (this.state.city === 'LasPinas') {
				this.setState(prevState => ({ price: prevState.price + 268 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Makati') {
				this.setState(prevState => ({ price: prevState.price + 156 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Malabon') {
				this.setState(prevState => ({ price: prevState.price + 180 }))
				this.setState({ route: 'Route1'})
			} else if (this.state.city === 'Mandaluyong') {
				this.setState(prevState => ({ price: prevState.price + 140 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'Manila') {
				this.setState(prevState => ({ price: prevState.price + 124 }))
				this.setState({ route: 'Route1'})
			} else if (this.state.city === 'Marikina') {
				this.setState(prevState => ({ price: prevState.price + 156 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'Muntinlupa') {
				this.setState(prevState => ({ price: prevState.price + 276 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Navotas') {
				this.setState(prevState => ({ price: prevState.price + 180 }))
				this.setState({ route: 'Route1'})
			} else if (this.state.city === 'Paranaque') {
				this.setState(prevState => ({ price: prevState.price + 236 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Pasay') {
				this.setState(prevState => ({ price: prevState.price + 164 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Pasig') {
				this.setState(prevState => ({ price: prevState.price + 140 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'Pateros') {
				this.setState(prevState => ({ price: prevState.price + 156 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Quezon') {
				this.setState(prevState => ({ price: prevState.price + 156 }))
				this.setState({ route: 'Route1'})
			} else if (this.state.city === 'SanJuan') {
				this.setState(prevState => ({ price: prevState.price + 124 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'SanMateo') {
				this.setState(prevState => ({ price: prevState.price + 276 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'Taguig') {
				this.setState(prevState => ({ price: prevState.price + 180 }))
				this.setState({ route: 'Route3'})
			} else if (this.state.city === 'Taytay') {
				this.setState(prevState => ({ price: prevState.price + 268 }))
				this.setState({ route: 'Route2'})
			} else if (this.state.city === 'Valenzuela') {
				this.setState(prevState => ({ price: prevState.price + 180 }))
				this.setState({ route: 'Route1'})
			}
		}
		else if (this.state.mode === 'Pickup') {
			this.setState({ city: '' })
		}
	}

	instructionFee = () => {
		if (this.state.mode === 'Pickup') {
			if (this.state.pInstructions === '' || this.state.pInstructions === 'None' || this.state.pInstructions === 'Writing') {
				this.setState(prevState => ({ price: prevState.price + 0 }))
			} else if (this.state.pInstructions === 'Personalized' || this.state.dInstructions === 'Candle') {
				this.setState(prevState => ({ price: prevState.price + 20 }))
			} else if (this.state.pInstructions === 'Frosting') {
				this.setState(prevState => ({ price: prevState.price + 10 }))
			}
		}
		else if (this.state.mode === 'Delivery') {
			if (this.state.dInstructions === '' || this.state.dInstructions === 'None' || this.state.dInstructions === 'Writing') {
				this.setState(prevState => ({ price: prevState.price + 0 }))
			} else if (this.state.dInstructions === 'Personalized' || this.state.dInstructions === 'Candle') {
				this.setState(prevState => ({ price: prevState.price + 20 }))
			} else if (this.state.dInstructions === 'Frosting') {
				this.setState(prevState => ({ price: prevState.price + 10 }))
			}
		}
	}

	dateFilterRoute1 = (date) => {
		const day = getDay(date)
		return day !== 0 && day !== 1 && day !== 3 && day !== 4 && day !== 6 && day !== 7
	}

	dateFilterRoute2 = (date) => {
		const day = getDay(date)
		return day !== 0 && day !== 1 && day !== 2 && day !== 4 && day !== 5 && day !== 7
	}

	dateFilterRoute3 = (date) => {
		const day = getDay(date)
		return day !== 1 && day !== 2 && day !== 3 && day !== 5 && day !== 6 && day !== 7
	}

	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	removeSpaces = (string) => string.split(' ').join('')

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
				Number: this.removeSpaces(this.state.number),
				Mode: this.state.mode,
				Price: this.state.price,
				PickupDate: this.state.pDate,
				PickupPayment: this.state.pPayment,
				Instructions: this.state.pInstructions,
				Note: this.state.pNote,
				orderStatus: this.state.orderStatus,
				paymentStatus: this.state.paymentStatus 
			})
		}
		else if (this.state.mode == 'Delivery') {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order: ${today}`).child('Order Details').set({
				Name: this.state.name,
				Number: this.removeSpaces(this.state.number),
				Mode: this.state.mode,
				Price: this.state.price,
				DeliveryPayment: this.state.dPayment,
				Address: this.state.address,
				City: this.state.city,
				Route: this.state.route,
				DeliveryDate: this.state.dDate,
				Instructions: this.state.dInstructions,
				Note: this.state.dNote,
				orderStatus: this.state.orderStatus,
				paymentStatus: this.state.paymentStatus
			})
		}
	}

	clearFields = () => {
		this.setState({
			name: '',       number: '',       mode: '',                price: 0,

		    pDate: '',      pPayment: '',     pInstructions: '',       pNote: '',
		
		    dPayment: '',   address: '',      city: '',                dDate: '',       route: '',       dInstructions: '',       dNote: ''
		})
	}

	order = (event) => {
		event.preventDefault()
		if (this.state.pendingOrders && this.state.pendingOrders.length > 0) {
			if (this.state.mode === 'Pickup') {
				if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.mode.trim() !== "" && this.state.pDate.trim() !== "" && this.state.pPayment.trim() !== "" && this.state.pInstructions.trim() !== "") {
					const confirm = window.confirm('Confirm your purchase?')
					if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }
				}
				else { alert("Please fill in all input fields.") }
			}
			else if (this.state.mode === 'Delivery') {
				if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.mode.trim() !== "" && this.state.dPayment.trim() !== "" && this.state.address.trim() !== "" && this.state.city.trim() !== "" && this.state.dDate.trim() !== "" && this.state.dInstructions.trim() !== "") {
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
		
									<DatePicker selected={this.state.pDate} onChange={date => this.setState({ pDate: date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} placeholderText="dd/mm/yyyy" />

									<select onChange={this.handleChange} value={this.state.pPayment} name="pPayment">
										<option value="">--Payment Method--</option>
										<option value="payOnPickup">Pay on Pickup</option>
										<option value="P_transfer">BDO Bank Transfer</option>
									</select>

									<select onChange={this.handleChange} value={this.state.pInstructions} name="pInstructions">
										<option value="">--Special Instruction--</option>
										<option value="None">None</option>
										<option value="Writing">1 Line of Writing on Box (Free)</option>
										<option value="Personalized">Personalized Note (+ P20)</option>
										<option value="Candle">Candles (+ P20)</option>
										<option value="Frosting">Separate Frosting (+ P10)</option>
									</select>
									{this.state.pInstructions === 'Writing' || this.state.pInstructions === 'Personalized' || this.state.pInstructions === 'Candle' ? 
										<div>
											<input onChange={this.handleChange} value={this.state.pNote} name="pNote" type="text" placeholder="Description" /> 
											<p style={{ color: 'white' }}>Boxes of 12 may not be split up into 2 boxes of 6</p> 
										</div>
									: null}

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
									
									<select onChange={this.handleChange} value={this.state.city} name="city">
										<option value="">--Select City--</option>
										<option value="Cainta">Cainta</option>
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
										<option value="Pasay">Pasay</option>
										<option value="Pasig">Pasig</option>
										<option value="Pateros">Pateros</option>
										<option value="Quezon">Quezon</option>
										<option value="SanJuan">San Juan</option>
										<option value="SanMateo">San Mateo</option>
										<option value="Taguig">Taguig</option>
										<option value="Taytay">Taytay</option>
										<option value="Valenzuela">Valenzuela</option>
									</select>
									<p>We only deliver to the cities mentioned above.</p>


									{this.state.route !== '' && this.state.route === 'Route1' ?
										<DatePicker selected={this.state.dDate} onChange={date => this.setState({ dDate: date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.dateFilterRoute1} placeholderText="dd/mm/yyyy" />
									: null}

									{this.state.route !== '' && this.state.route === 'Route2' ?
										<DatePicker selected={this.state.dDate} onChange={date => this.setState({ dDate: date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.dateFilterRoute2} placeholderText="dd/mm/yyyy" />
									: null}

									{this.state.route !== '' && this.state.route === 'Route3' ?
										<DatePicker selected={this.state.dDate} onChange={date => this.setState({ dDate: date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.dateFilterRoute3} placeholderText="dd/mm/yyyy" />
									: null}


									<select onChange={this.handleChange} value={this.state.dInstructions} name="dInstructions">
										<option value="">--Special Instruction--</option>
										<option value="None">None</option>
										<option value="Writing">1 Line of Writing on Box (Free)</option>
										<option value="Personalized">Personalized Note (+ P20)</option>
										<option value="Candle">Candles (+ P20)</option>
										<option value="Frosting">Separate Frosting (+ P10)</option>
									</select>
									{this.state.dInstructions === 'Writing' || this.state.dInstructions === 'Personalized' || this.state.dInstructions === 'Candle' ? 
										<div>
											<input onChange={this.handleChange} value={this.state.dNote} name="dNote" type="text" placeholder="Description" /> 
											<p style={{ color: 'white' }}>Boxes of 12 may not be split up into 2 boxes of 6</p> 
										</div>
									: null}

								</div>
							: null}
						</div>		
						
						<div>
							<p>Total: {this.state.price} (Additional / Delivery Fees Already Included.)</p>
							<button onClick={this.order}>Order</button>
						</div>
					</form>
				</div>
			</section>
		)
	}
}

export default Order