import React, { Component } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, addMonths, getDay } from 'date-fns'
import moment from 'moment'
import Select from 'react-select'


class Order extends Component {
	state = {
		consumer: this.props.consumer,
		pendingOrders: [],
		price: 0,

		orderTracker: [],

		dateRange: [],
		maxDeliveries: 0,

		name: '',
		number: '',
		mode: '',

		options: [
		 	{ value: 'None', label: 'None' },
		  	{ value: 'Personalized', label: 'Personalized Note (+ P20)' },
		  	{ value: 'extraFrosting', label: 'Extra Frosting 100ml (+ P50)' }
		],

		pDate: '',
		pPayment: '',
		pInstructions: [],
		pNote: '',
		pAmount: '',
		
		dPayment: '',
		address: '',
		city: '',
		dDate: '',
		route: '',
		dInstructions: [],
		dNote: '',
		dAmount: '',

		discount: 0,
		voucherCode: '',
		generatedVouchers: [],
		consumedVouchers: [],

		orderStatus: 'Not Ready',
		paymentStatus: 'Payment Pending',
		contacted: false
	}

	componentDidMount = async () => {
		setInterval(() => { this.displayTotal(); this.cityFee(); this.instructionFee(); this.getOrderNumber(); this.discount() }, 100)

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

		firebase.database().ref('discounts').child('Generated').on('value', snapshot => {
			let generatedVouchers = []
			snapshot.forEach((snap) => { generatedVouchers.push(snap.val()) })
			this.setState({ generatedVouchers })
		})

		firebase.database().ref('discounts').child('Consumed').on('value', snapshot => {
			let consumedVouchers = []
			snapshot.forEach((snap) => { consumedVouchers.push(snap.val()) })
			this.setState({ consumedVouchers })
		})

		firebase.database().ref('products').child('Discount Amount').on('value', snapshot => {
			this.setState({ discount: snapshot.val().Discount })
		})
	}

	getOrderNumber = () => {
		firebase.database().ref('rolls').on('value', snapshot => {
			let orderTracker = []
			snapshot.forEach((user) => {
				user.forEach((order) => {
					orderTracker.push(order.key)
				})
			})
			this.setState({ orderTracker })
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
			if (this.state.price < 1500) {
				if (this.state.city === '') {
					this.setState(prevState => ({ price: prevState.price + 0 }))
				} else if (this.state.city === 'Cainta') {
					this.setState(prevState => ({ price: prevState.price + 210 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Caloocan') {
					this.setState(prevState => ({ price: prevState.price + 200 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'LasPinas') {
					this.setState(prevState => ({ price: prevState.price + 250 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Makati') {
					this.setState(prevState => ({ price: prevState.price + 140 }))
					this.setState({ route: 'Route4_Makati'})
				} else if (this.state.city === 'Malabon') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'Mandaluyong') {
					this.setState(prevState => ({ price: prevState.price + 120 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Manila') {
					this.setState(prevState => ({ price: prevState.price + 110 }))
					this.setState({ route: 'Route4_Manila'})
				} else if (this.state.city === 'Marikina') {
					this.setState(prevState => ({ price: prevState.price + 140 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'Muntinlupa') {
					this.setState(prevState => ({ price: prevState.price + 260 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Navotas') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route1'})
				} else if (this.state.city === 'Paranaque') {
					this.setState(prevState => ({ price: prevState.price + 220 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Pasay') {
					this.setState(prevState => ({ price: prevState.price + 150 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Pasig') {
					this.setState(prevState => ({ price: prevState.price + 120 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Pateros') {
					this.setState(prevState => ({ price: prevState.price + 140 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Quezon') {
					this.setState(prevState => ({ price: prevState.price + 140 }))
					this.setState({ route: 'Route4_QC'})
				} else if (this.state.city === 'SanJuan') {
					this.setState(prevState => ({ price: prevState.price + 110 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'SanMateo') {
					this.setState(prevState => ({ price: prevState.price + 260 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Taguig') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
					this.setState({ route: 'Route3'})
				} else if (this.state.city === 'Taytay') {
					this.setState(prevState => ({ price: prevState.price + 250 }))
					this.setState({ route: 'Route2'})
				} else if (this.state.city === 'Valenzuela') {
					this.setState(prevState => ({ price: prevState.price + 160 }))
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
			if (this.state.pInstructions.length < 1 || this.state.pInstructions.length === 1 && this.state.pInstructions.includes('None')) {
				this.setState(prevState => ({ price: prevState.price + 0 }))
			}

			if (this.state.pInstructions.includes('Personalized') || this.state.pInstructions.includes('Candle')) {
				this.setState(prevState => ({ price: prevState.price + 20 }))
			}

			if (this.state.pInstructions.includes('extraFrosting')) {
				this.extraFrostingFeePickup()
			}
		}
		else if (this.state.mode === 'Delivery') {
			if (this.state.dInstructions.length < 1 || this.state.dInstructions.length === 1 && this.state.dInstructions.includes('None')) {
				this.setState(prevState => ({ price: prevState.price + 0 }))
			}

			if (this.state.dInstructions.includes('Personalized') || this.state.dInstructions.includes('Candle')) {
				this.setState(prevState => ({ price: prevState.price + 20 }))
			}

			if (this.state.dInstructions.includes('extraFrosting')) {
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

	discount = () => {
		if (this.state.voucherCode !== '' && !this.state.consumedVouchers.includes(this.state.voucherCode) && this.state.generatedVouchers.includes(this.state.voucherCode)) {
			var discountAmount = (100 - this.state.discount) / 100
			this.setState(prevState => ({ price: prevState.price * discountAmount }))
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

	//route filters
	dateFilterRoute1 = (date) => {
		const day = getDay(date)
		return day !== 0 && day !== 1 && day !== 3 && day !== 4 && day !== 6
	}

	dateFilterRoute2 = (date) => {
		const day = getDay(date)
		return day !== 0 && day !== 1 && day !== 2 && day !== 4 && day !== 5
	}

	dateFilterRoute3 = (date) => {
		const day = getDay(date)
		return day !== 0 && day !== 1 && day !== 2 && day !== 3 && day !== 5 && day !== 6
	}

	QC_dateFilterRoute4 = (date) => {
		const day = getDay(date)
		return day !== 1 && day !== 3 && day !== 4 && day !== 6
	}

	Makati_dateFilterRoute4 = (date) => {
		const day = getDay(date)
		return day !== 1 && day !== 2 && day !== 3 && day !== 5 && day !== 6
	}

	Manila_dateFilterRoute4 = (date) => {
		const day = getDay(date)
		return day !== 1 && day !== 2 && day !== 4 && day !== 5
	}

	//handle changes
	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	handlePickupSelectChange = (pInstructions) => {
		this.setState({ pInstructions })
		firebase.database().ref('rules').child(`${this.state.consumer}`).set(pInstructions)

		firebase.database().ref('rules').child(`${this.state.consumer}`).once('value', snapshot => {
			let pInstructions = []
			snapshot.forEach((snap) => { pInstructions.push(snap.val().value) })
			this.setState({ pInstructions })
		})
	}

	handleDeliverySelectChange = (dInstructions) => {
		this.setState({ dInstructions })
		firebase.database().ref('rules').child(`${this.state.consumer}`).set(dInstructions)

		firebase.database().ref('rules').child(`${this.state.consumer}`).once('value', snapshot => {
			let dInstructions = []
			snapshot.forEach((snap) => { dInstructions.push(snap.val().value) })
			this.setState({ dInstructions })
		})
	}

	removeSpaces = (string) => string.split(' ').join('')

	//update data in database
	moveOrderRecord = () => {
		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').once('value', snapshot => {
			firebase.database().ref(`users/${this.state.consumer}`).child('Delivered Orders').update( snapshot.val(), () => {
				firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').remove()
			})
		})
	}

	timestamp = () => {
		let newDate = new Date()
		let dateToday = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		let hour = newDate.getHours();
		let mins = newDate.getMinutes();
		let sec = newDate.getSeconds();

		return month + "/" + dateToday + "/" + year + "/" + hour + "/" + mins + "/" + sec
	}

	updateRolls = () => {
		let orderNumber = this.state.orderTracker.length + 1

		firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').once('value', snapshot => {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order Number: 1000${orderNumber}`).child('Order Items').set( snapshot.val() )
		})

		if (this.state.mode === 'Pickup') {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order Number: 1000${orderNumber}`).child('Order Details').update({
				Name: this.state.name,
				Number: this.removeSpaces(this.state.number),
				Mode: this.state.mode,
				Price: this.state.price,
				PickupPayment: this.state.pPayment,	
				FrostingInstructions: this.state.pAmount,
				Note: this.state.pNote,
				orderStatus: this.state.orderStatus,
				paymentStatus: this.state.paymentStatus,
				contacted: this.state.contacted,
				Date: moment(this.state.pDate).format('L'),
				Created: this.timestamp()
			})
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order Number: 1000${orderNumber}`).child('Order Instructions').update({
				Instructions: this.state.pInstructions
			})
			firebase.database().ref('discounts').child('Consumed').push(this.state.voucherCode)
		}
		else if (this.state.mode === 'Delivery') {
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order Number: 1000${orderNumber}`).child('Order Details').update({
				Name: this.state.name,
				Number: this.removeSpaces(this.state.number),
				Mode: this.state.mode,
				Price: this.state.price,
				DeliveryPayment: this.state.dPayment,
				Address: this.state.address,
				City: this.state.city,
				Route: this.state.route,
				FrostingInstructions: this.state.dAmount,
				Note: this.state.dNote,
				orderStatus: this.state.orderStatus,
				paymentStatus: this.state.paymentStatus,
				contacted: this.state.contacted,
				Date: moment(this.state.dDate).format('L'),
				Created: this.timestamp()
			})
			firebase.database().ref('rolls').child(`${this.state.consumer}`).child(`Order Number: 1000${orderNumber}`).child('Order Instructions').update({
				Instructions: this.state.dInstructions
			})
			firebase.database().ref('discounts').child('Consumed').push(this.state.voucherCode)
			//save this in its own node in order to keep track of the amount of times the date was used for deliveries
			firebase.database().ref('deliveryDates').push( moment(this.state.dDate).format('L') )
		}
	}

	clearFields = () => {
		this.setState({
		    price: 0,
			name: '',
			number: '',
			mode: '',

			pDate: '',
			pPayment: '',
			pInstructions: [],
			pNote: '',
			pAmount: '',
			
			dPayment: '',
			address: '',
			city: '',
			dDate: '',
			route: '',
			dInstructions: [],
			dNote: '',
			dAmount: '',

			voucherCode: ''
		})

		alert("Thank you for ordering! Please expect an SMS regarding your order within the day.")
	}
	
	orderPickup = () => {
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

	orderDelivery = () => {
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

	order = (event) => {
		event.preventDefault()

		if (this.state.voucherCode !== '' && this.state.generatedVouchers.includes(this.state.voucherCode) && !this.state.consumedVouchers.includes(this.state.voucherCode) || this.state.voucherCode === '') {
			if (this.state.pendingOrders && this.state.pendingOrders.length > 0) {
				if (this.state.mode === '') { 
					alert("Kindly select a receive method — whether that be pickup or delivery.")
				}
				else if (this.state.mode === 'Pickup') {
					if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.pDate !== "" && this.state.pPayment.trim() !== "" && this.state.pInstructions.length > 0) {
						if (this.state.pInstructions.length > 1 && this.state.pInstructions.includes('None')) {
							alert("Kindly remove any other additional instruction if you wish to proceed with None.")
						}
						else {
							if (this.state.pInstructions.includes('Personalized') || this.state.pInstructions.includes('Candle') || this.state.pInstructions.includes('extraFrosting')) {
								if (this.state.pInstructions.includes('extraFrosting') && this.state.pInstructions.length === 1) {
									{ this.state.pAmount.trim() !== '' ? this.orderPickup() : alert("Please fill in all input fields.") }
								}
								else if (this.state.pInstructions.includes('extraFrosting') && this.state.pInstructions.length > 1) {
									{ this.state.pNote.trim() !== '' && this.state.pAmount.trim() !== '' ? this.orderPickup() : alert("Please fill in all the input fields.") }
								}
								else if (this.state.pInstructions.includes('Personalized') || this.state.pInstructions.includes('Candle')) {
									{ this.state.pNote.trim() !== '' ? this.orderPickup() : alert("Please fill in all the input fields.") }
								}
							}
							else if (this.state.pInstructions.includes('None') && this.state.pInstructions.length === 1) { this.orderPickup() }
						}
					}
					else { alert("Please fill in all input fields.") }
				}
				else if (this.state.mode === 'Delivery') {
					if (this.state.pendingOrders.length < 2 && this.state.pendingOrders.includes('P1')) {
						alert("Minimum of 2 boxes of the 6pcs Cinammon Rolls required for delivery.")
					} 
					else {
						if (this.state.name.trim() !== "" && this.state.number.trim() !== "" && this.state.dPayment.trim() !== "" && this.state.address.trim() !== "" && this.state.city.trim() !== "" && this.state.dDate !== "" && this.state.dInstructions.length > 0) {
							if (this.state.dInstructions.length > 1 && this.state.dInstructions.includes('None')) {
								alert("Kindly remove any other additional instruction if you wish to proceed with None.")
							}
							else {
								if (this.state.dInstructions.includes('Personalized') || this.state.dInstructions.includes('Candle') || this.state.dInstructions.includes('extraFrosting')) {
									if (this.state.dInstructions.includes('extraFrosting') && this.state.dInstructions.length === 1) {
										{ this.state.dAmount.trim() !== '' ? this.orderDelivery() : alert("Please fill in all input fields.") }
									}
									else if (this.state.dInstructions.includes('extraFrosting') && this.state.dInstructions.length > 1) {
										{ this.state.dNote.trim() !== '' && this.state.dAmount.trim() !== '' ? this.orderDelivery() : alert("Please fill in all the input fields.") }
									}
									else if (this.state.dInstructions.includes('Personalized') || this.state.dInstructions.includes('Candle')) {
										{ this.state.dNote.trim() !== '' ? this.orderDelivery() : alert("Please fill in all the input fields.") }
									}						
								}
								else if (this.state.dInstructions.includes('None') && this.state.dInstructions.length === 1) { this.orderDelivery() }
							}
						}
						else { alert("Please fill in all the input fields.") }
					}
				}
			}
			else { alert("Your cart is empty.") }
		}
		else if (this.state.voucherCode !== '' && !this.state.generatedVouchers.includes(this.state.voucherCode)) { 
			alert("This voucher code is invalid.")
		}
		else if (this.state.voucherCode !== '' && this.state.generatedVouchers.includes(this.state.voucherCode) && this.state.consumedVouchers.includes(this.state.voucherCode)) { 
			alert("This voucher code has already been consumed.")
		}
 	}

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
	
									<Select isMulti options={this.state.options} onChange={this.handlePickupSelectChange} id="instructions" placeholder="Additional Instructions" isSearchable={ false } inputProps={{readOnly:true}} />

									{this.state.pInstructions.includes('Personalized') || this.state.pInstructions.includes('Candle') ? 
											<input class="slideLeft" onChange={this.handleChange} value={this.state.pNote} name="pNote" type="text" placeholder="Instructions Description" /> 
									: null}

									{this.state.pInstructions.includes('extraFrosting') ?
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
									{this.state.route !== '' && this.state.route === 'Route4_QC' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.QC_dateFilterRoute4} id="deliveryPicker" />
										</div>
									: null}
									{this.state.route !== '' && this.state.route === 'Route4_Manila' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.Manila_dateFilterRoute4} id="deliveryPicker" />
										</div>
									: null}
									{this.state.route !== '' && this.state.route === 'Route4_Makati' ?
										<div class="datepicker">
											<h1>Delivery Date</h1>
											<DatePicker inline selected={this.state.dDate} onChange={date => this.setDate(date)} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.Makati_dateFilterRoute4} id="deliveryPicker" />
										</div>
									: null}

									<Select isMulti options={this.state.options} onChange={this.handleDeliverySelectChange} id="instructions" placeholder="Additional Instructions" isSearchable={ false } inputProps={{readOnly:true}} />

									{this.state.dInstructions.includes('Personalized') || this.state.dInstructions.includes('Candle') ? 
										<input class="slideLeft" onChange={this.handleChange} value={this.state.dNote} name="dNote" type="text" placeholder="Instructions Description" /> 
									: null}

									{this.state.dInstructions.includes('extraFrosting') ?
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
							<p>Total: P{this.state.price.toFixed(2)} (Additional / Delivery / Discount Fees Already Included.)</p>
							<p>Note: Free delivery for purchases over P1500.00</p>
							<input onChange={this.handleChange} value={this.state.voucherCode.trim()} name="voucherCode" placeholder="Voucher Code (if any)"></input>
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