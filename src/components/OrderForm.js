import React, { Component } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, addMonths, getDay } from 'date-fns'
import moment from 'moment'


class Order extends Component {
	state = {
		consumer: this.props.consumer,    pendingOrders: [],     price: 0,        

		dateRange: [],  maxDeliveries: 0,

		name: '',       number: '',       mode: '',

		pDate: '',      pPayment: '',     pInstructions: '',     pNote: '',       pAmount: '',
		
		dPayment: '',   address: '',      city: '',              dDate: '',       route: '',       dInstructions: '',       dNote: '',       dAmount: '',

		orderStatus: 'Not Ready',         paymentStatus: 'Payment Pending',       contacted: false
	}

	componentDidMount = async () => {
		setInterval(() => { this.displayTotal(); this.cityFee(); this.instructionFee(); }, 100)

		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').on('value', snapshot => {
			let pendingOrders = []
			snapshot.forEach((snap) => { pendingOrders.push(snap.val()) })
			this.setState({ pendingOrders })
		})

		firebase.database().ref('deliveryDates').on('value', snapshot => {
			let dateRange = []
			snapshot.forEach((snap) => { dateRange.push(snap.val()) })
			this.setState({ dateRange })
		})

		firebase.database().ref('products').child('Delivery Number').on('value', snapshot => {
			this.setState({ maxDeliveries: snapshot.val().MaxDelivery })
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
			this.setState(prevState => ({ price: prevState.price + 20 }))

			if (this.state.price < 1800) {
				if (this.state.city === '') {
					this.setState(prevState => ({ price: prevState.price + 0 }))
				} else if (this.state.city === 'Cainta') {
					this.setState(prevState => ({ price: prevState.price + 230 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Caloocan') {
					this.setState(prevState => ({ price: prevState.price + 220 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'LasPinas') {
					this.setState(prevState => ({ price: prevState.price + 270 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Makati') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Malabon') {
					this.setState(prevState => ({ price: prevState.price + 180 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'Mandaluyong') {
					this.setState(prevState => ({ price: prevState.price + 140 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Manila') {
					this.setState(prevState => ({ price: prevState.price + 130 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Marikina') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'Muntinlupa') {
					this.setState(prevState => ({ price: prevState.price + 280 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Navotas') {
					this.setState(prevState => ({ price: prevState.price + 180 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'Paranaque') {
					this.setState(prevState => ({ price: prevState.price + 240 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Pasay') {
					this.setState(prevState => ({ price: prevState.price + 170 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Pasig') {
					this.setState(prevState => ({ price: prevState.price + 140 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Pateros') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Quezon') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'SanJuan') {
					this.setState(prevState => ({ price: prevState.price + 130 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'SanMateo') {
					this.setState(prevState => ({ price: prevState.price + 280 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Taguig') {
					this.setState(prevState => ({ price: prevState.price + 180 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Taytay') {
					this.setState(prevState => ({ price: prevState.price + 270 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Valenzuela') {
					this.setState(prevState => ({ price: prevState.price + 180 }))
					this.setState({ route: 'Route1'})
				}
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
			} else if (this.state.pInstructions === 'extraFrosting') {
				this.extraFrostingFeePickup()
			}
		}
		else if (this.state.mode === 'Delivery') {
			if (this.state.dInstructions === '' || this.state.dInstructions === 'None' || this.state.dInstructions === 'Writing') {
				this.setState(prevState => ({ price: prevState.price + 0 }))
			} else if (this.state.dInstructions === 'Personalized' || this.state.dInstructions === 'Candle') {
				this.setState(prevState => ({ price: prevState.price + 20 }))
			} else if (this.state.dInstructions === 'Frosting') {
				this.setState(prevState => ({ price: prevState.price + 10 }))
			} else if (this.state.dInstructions === 'extraFrosting') {
				this.extraFrostingFeeDelivery()
			}
		}
	}

	extraFrostingFeePickup = () => {
		if (this.state.pAmount === '') {
			this.setState(prevState => ({ price: prevState.price + 0 }))
		} else if (this.state.pAmount === 'Amount: 1') {
			this.setState(prevState => ({ price: prevState.price + 50 }))
		} else if (this.state.pAmount === 'Amount: 2') {
			this.setState(prevState => ({ price: prevState.price + 100 }))
		} else if (this.state.pAmount === 'Amount: 3') {
			this.setState(prevState => ({ price: prevState.price + 150 }))
		} else if (this.state.pAmount === 'Amount: 4') {
			this.setState(prevState => ({ price: prevState.price + 200 }))
		} else if (this.state.pAmount === 'Amount: 5') {
			this.setState(prevState => ({ price: prevState.price + 250 }))
		} else if (this.state.pAmount === 'Amount: 6') {
			this.setState(prevState => ({ price: prevState.price + 300 }))
		} else if (this.state.pAmount === 'Amount: 7') {
			this.setState(prevState => ({ price: prevState.price + 350 }))
		} else if (this.state.pAmount === 'Amount: 8') {
			this.setState(prevState => ({ price: prevState.price + 400 }))
		} else if (this.state.pAmount === 'Amount: 9') {
			this.setState(prevState => ({ price: prevState.price + 450 }))
		} else if (this.state.pAmount === 'Amount: 10') {
			this.setState(prevState => ({ price: prevState.price + 500 }))
		}
	}

	extraFrostingFeeDelivery = () => {
		if (this.state.dAmount === '') {
			this.setState(prevState => ({ price: prevState.price + 0 }))
		} else if (this.state.dAmount === 'Amount: 1') {
			this.setState(prevState => ({ price: prevState.price + 50 }))
		} else if (this.state.dAmount === 'Amount: 2') {
			this.setState(prevState => ({ price: prevState.price + 100 }))
		} else if (this.state.dAmount === 'Amount: 3') {
			this.setState(prevState => ({ price: prevState.price + 150 }))
		} else if (this.state.dAmount === 'Amount: 4') {
			this.setState(prevState => ({ price: prevState.price + 200 }))
		} else if (this.state.dAmount === 'Amount: 5') {
			this.setState(prevState => ({ price: prevState.price + 250 }))
		} else if (this.state.dAmount === 'Amount: 6') {
			this.setState(prevState => ({ price: prevState.price + 300 }))
		} else if (this.state.dAmount === 'Amount: 7') {
			this.setState(prevState => ({ price: prevState.price + 350 }))
		} else if (this.state.dAmount === 'Amount: 8') {
			this.setState(prevState => ({ price: prevState.price + 400 }))
		} else if (this.state.dAmount === 'Amount: 9') {
			this.setState(prevState => ({ price: prevState.price + 450 }))
		} else if (this.state.dAmount === 'Amount: 10') {
			this.setState(prevState => ({ price: prevState.price + 500 }))
		}
	}

	maxDeliveries = (value) => this.state.dateRange.filter((v) => (v === value)).length

	setDate = (date) => {
		let disabled = moment(date).format('L')
		let checkArray = this.state.dateRange.filter((v) => (v === disabled)).length

		if (checkArray >= this.state.maxDeliveries) {
			alert('We are sorry, but there is no more stock for this day.')
		}
		else if (checkArray < this.state.maxDeliveries) {
			this.setState({ dDate: date })
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
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order: ${today}`).child('Order Details').update({
				Name: this.state.name,
				Number: this.removeSpaces(this.state.number),
				Mode: this.state.mode,
				Price: this.state.price,
				PickupPayment: this.state.pPayment,
				Instructions: this.state.pInstructions,
				FrostingInstructions: this.state.pAmount,
				Note: this.state.pNote,
				orderStatus: this.state.orderStatus,
				paymentStatus: this.state.paymentStatus,
				contacted: this.state.contacted,
				Date: moment(this.state.pDate).format('L')
			})
		}
		else if (this.state.mode === 'Delivery') {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order: ${today}`).child('Order Details').update({
				Name: this.state.name,
				Number: this.removeSpaces(this.state.number),
				Mode: this.state.mode,
				Price: this.state.price,
				DeliveryPayment: this.state.dPayment,
				Address: this.state.address,
				City: this.state.city,
				Route: this.state.route,
				Instructions: this.state.dInstructions,
				FrostingInstructions: this.state.dAmount,
				Note: this.state.dNote,
				orderStatus: this.state.orderStatus,
				paymentStatus: this.state.paymentStatus,
				contacted: this.state.contacted,
				Date: moment(this.state.dDate).format('L')
			})
			//save this in its own node in order to keep track of the amount of times the date was used for deliveries
			firebase.database().ref('deliveryDates').push(
				moment(this.state.dDate).format('L')
			)
		}
	}

	clearFields = () => {
		this.setState({
			name: '',       number: '',       mode: '',                price: 0,

		    pDate: '',      pPayment: '',     pInstructions: '',       pNote: '',
		
		    dPayment: '',   address: '',      city: '',                dDate: '',       route: '',       dInstructions: '',       dNote: ''
		})

		alert("Thank you for ordering! Please expect an SMS regarding your order within the day.")
	}

	order = (event) => {
		event.preventDefault()
		if (this.state.pendingOrders && this.state.pendingOrders.length > 0) {
			if (this.state.mode === 'Pickup') {
				if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.mode.trim() !== "" && this.state.pDate !== "" && this.state.pPayment.trim() !== "" && this.state.pInstructions.trim() !== "" && (this.state.pInstructions === 'Writing' && this.state.pNote.trim() !== "" || this.state.pInstructions === 'Personalized' && this.state.pNote.trim() !== "" || this.state.pInstructions === 'Candle' && this.state.pNote.trim() !== "" || this.state.pInstructions === 'None' && this.state.pNote.trim() === '' || this.state.pInstructions === 'Frosting' && this.state.pNote.trim() === '' || this.state.pInstructions === 'extraFrosting' && this.state.pAmount.trim() !== '' )) {
					if (this.state.pPayment === 'P_transfer') {
						const inform = window.confirm('BDO Transfer To: BDO S/A 011090012568 Patrice Raphaelle S. Bendicion. The pickup place will be at: #25 8th St., New Manila, Mariana Quezon City. Proceed?')
						if (inform) {
							const confirm = window.confirm('Confirm your purchase?')
							if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }
						}
					}
					else if (this.state.pPayment === 'payOnPickup') {
						const inform = window.confirm('The pickup place will be at: #25 8th St., New Manila, Mariana Quezon City. Proceed?')
						if (inform) {
							const confirm = window.confirm('Confirm your purchase?')
							if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }
						}
					}
				}
				else { alert("Please fill in all input fields.") }
			}
			else if (this.state.mode === 'Delivery') {
				if (this.state.pendingOrders.length < 2 && this.state.pendingOrders.includes('P1')) {
					alert("Minimum of 2 boxes of the 6pcs Cinammon Rolls required for delivery.")
				} 
				else {
					if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.mode.trim() !== "" && this.state.dPayment.trim() !== "" && this.state.address.trim() !== "" && this.state.city.trim() !== "" && this.state.dDate !== "" && this.state.dInstructions.trim() !== "" && (this.state.dInstructions === 'Writing' && this.state.dNote.trim() !== "" || this.state.dInstructions === 'Personalized' && this.state.dNote.trim() !== "" || this.state.dInstructions === 'Candle' && this.state.dNote.trim() !== "" || this.state.dInstructions === 'None' && this.state.dNote.trim() === '' || this.state.dInstructions === 'Frosting' && this.state.dNote.trim() === '' || this.state.dInstructions === 'extraFrosting' && this.state.dAmount.trim() !== '' )) {
						if (this.state.dPayment === 'D_transfer') {
							const inform = window.confirm('BDO Transfer To: BDO S/A 011090012568 Patrice Raphaelle S. Bendicion. Proceed?')
							if (inform) {
								const confirm = window.confirm('Confirm your purchase?')
								if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }		
							}
						}
						else if (this.state.dPayment === 'cod') {
							const confirm = window.confirm('Confirm your purchase?')
							if (confirm) { this.moveOrderRecord(); this.updateRolls(); this.clearFields() }		
						}
					}
					else { alert("Please fill in all the input fields.") }
				}
			}
		}
		else { alert("Your cart is empty.") }
 	}

//<option value="Writing">1 Line of Writing on Box (Free)</option>
//<option value="Personalized">Personalized Note (+ P20)</option>
//<option value="Candle">Candles (+ P20)</option>

	render() {
		return (
			<section id="orderDetails">
				<div class="container fade-in">
					<div id="orderHeader"> <h1>Order Form</h1> </div>
					<form autocomplete="off">
						<div class="identity">
							<input onChange={this.handleChange} value={this.state.name} name="name" type="text" placeholder="First Name, Last Name" />
							<input onChange={this.handleChange} value={this.state.number} name="number" type="text" placeholder="Phone Number" />
						</div>

						<div class="mode">
							<select onChange={this.handleChange} value={this.state.mode} name="mode">
								<option value="">--Select Receive Method--</option>
								<option value="Pickup">Pick Up</option>
								<option value="Delivery">Delivery</option>
							</select>
						</div>

						<div class="showcase">
							{this.state.mode === 'Pickup' || this.state.mode === '' ? 
								<div id="pickupForm" class="slideRight">
									
									<div class="datepicker">
										<h1>Pickup Date</h1>
										<DatePicker inline selected={this.state.pDate} onChange={date => this.setState({ pDate: date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} format='MM-dd-yyyy' placeholderText="Date of Pickup" id="pickupPicker" />
									</div>

									<select onChange={this.handleChange} value={this.state.pPayment} name="pPayment">
										<option value="">--Payment Method--</option>
										<option value="payOnPickup">Pay on Pickup</option>
										<option value="P_transfer">BDO Bank Transfer</option>
									</select>

									<select onChange={this.handleChange} value={this.state.pInstructions} name="pInstructions" id="pickupInstructions">
										<option value="">--Additional Instructions--</option>
										<option value="None">None</option>
										<option value="Frosting">Separate Frosting (+ P10)</option>
										<option value="extraFrosting">Extra Frosting 100ml (+ P50)</option>
									</select>

									{this.state.pInstructions === 'Writing' || this.state.pInstructions === 'Personalized' || this.state.pInstructions === 'Candle' ? 
											<input class="slideLeft" onChange={this.handleChange} value={this.state.pNote} name="pNote" type="text" placeholder="Instructions Description" /> 
									: null}

									{this.state.pInstructions === 'extraFrosting' ?
										<select class="slideLeft" onChange={this.handleChange} value={this.state.pAmount} name="pAmount">
											<option value="">0</option>
											<option value="Amount: 1">1</option>
											<option value="Amount: 2">2</option>
											<option value="Amount: 3">3</option>
											<option value="Amount: 4">4</option>
											<option value="Amount: 5">5</option>
											<option value="Amount: 6">6</option>
											<option value="Amount: 7">7</option>
											<option value="Amount: 8">8</option>
											<option value="Amount: 9">9</option>
											<option value="Amount: 10">10</option>
										</select>
									: null}

								</div>
							: null}

							{this.state.mode === 'Delivery' ?
								<div id="deliveryForm" class="slideRight">

									<select onChange={this.handleChange} value={this.state.dPayment} name="dPayment">
										<option value="">--Payment Method--</option>
										<option value="cod">Cash on Delivery</option>
										<option value="D_transfer">BDO Bank Transfer</option>
									</select>
					
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
									
									<input onChange={this.handleChange} value={this.state.address} name="address" type="text" placeholder="Address" />

									{this.state.route === '' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} id="deliveryPicker" />
										</div>
									: null}

									{this.state.route !== '' && this.state.route === 'Route1' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.dateFilterRoute1} id="deliveryPicker" />
										</div>
									: null}

									{this.state.route !== '' && this.state.route === 'Route2' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.dateFilterRoute2} id="deliveryPicker" />
										</div>									
									: null}

									{this.state.route !== '' && this.state.route === 'Route3' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.dateFilterRoute3} id="deliveryPicker" />
										</div>
									: null}

									<select onChange={this.handleChange} value={this.state.dInstructions} name="dInstructions">
										<option value="">--Additional Instructions--</option>
										<option value="None">None</option>
										<option value="Frosting">Separate Frosting (+ P10)</option>
										<option value="extraFrosting">Extra Frosting 100ml (+ P50)</option>
									</select>

									{this.state.dInstructions === 'Writing' || this.state.dInstructions === 'Personalized' || this.state.dInstructions === 'Candle' ? 
										<input class="slideLeft" onChange={this.handleChange} value={this.state.dNote} name="dNote" type="text" placeholder="Instructions Description" /> 
									: null}

									{this.state.dInstructions === 'extraFrosting' ?
										<select class="slideLeft" onChange={this.handleChange} value={this.state.dAmount} name="dAmount">
											<option value="">0</option>
											<option value="Amount: 1">1</option>
											<option value="Amount: 2">2</option>
											<option value="Amount: 3">3</option>
											<option value="Amount: 4">4</option>
											<option value="Amount: 5">5</option>
											<option value="Amount: 6">6</option>
											<option value="Amount: 7">7</option>
											<option value="Amount: 8">8</option>
											<option value="Amount: 9">9</option>
											<option value="Amount: 10">10</option>
										</select>
									: null}

								</div>
							: null}
						</div>		
						
						<div class="footer">
							<p>Total: P{this.state.price}.00 (Additional / Delivery Fees Already Included.)</p>
							<p>Note: Free delivery for purchases over P1500.00</p>
							<button onClick={this.order}>Order</button>
						</div>
					</form>
				</div>

				<div class="informDetails">
					<p>Pickup Location: #25 8th St., New Manila, Mariana Quezon City</p>
					<p>BDO Transfer To: BDO S/A 011090012568 Patrice Raphaelle S. Bendicion</p>
					<p>Send Your Proof of Payment To: 0917 535 0923</p>
				</div>
			</section>
		)
	}
}

export default Order