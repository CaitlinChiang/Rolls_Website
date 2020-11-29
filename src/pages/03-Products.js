import React, { Component } from 'react'
import * as firebase from 'firebase'


class Products extends Component {
	state = {
		consumer: this.props.consumer,
		
		modal1: false,       
		stock1: true,
		product1Sets: '',
		price1: 0,

		modal2: false,
		stock2: true,
		product2Sets: '',
		price2: 0,

		modal3: false,
		stock3: true,
		product3Sets: '',
		price3: 0,

		// modal4: false,
		// stock4: true,
		// product4Sets: '',
		// price4: 0,

		modal5: false,
		stock5: true,
		product5Sets: '',
		price5: 0,

		modal6: false,
		stock6: true,
		product6Sets: '',
		price6: 0,

		modal7: false,
		stock7: true,
		product7Sets: '',
		price7: 0,

		modal8: false,
		stock8: true,
		product8Sets: '',
		price8: 0,

		modal9: false,
		stock9: true,
		product9Sets: '',
		price9: 0,

		modal10: false,
		stock10: true,
		product10Sets: '',
		price10: 0,

		modal11: false,
		stock11: true,
		product11Sets: '',
		price11: 0,

		modal12: false,
		stock12: true,
		product12Sets: '',
		price12: 0,

		modal13: false,
		stock13: true,
		product13Sets: '',
		price13: 0,

		modal14: false,
		stock14: true,
		product14Sets: '',
		price14: 0,

		modal15: false,
		stock15: true,
		product15Sets: '',
		price15: 0,

		modal16: false,
		stock16: true,
		product16Sets: '',
		price16: 0,

		modal17: false,
		stock17: true,
		product17Sets: '',
		price17: 0
	}

	componentDidMount = async () => {
		setInterval(() => { this.setPrice() }, 100)

		firebase.database().ref('products').child('P1').on('value', snapshot => {
			this.setState({ stock1: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P2').on('value', snapshot => {
			this.setState({ stock2: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P3').on('value', snapshot => {
			this.setState({ stock3: snapshot.val().Stock })
		})

		// firebase.database().ref('products').child('P4').on('value', snapshot => {
		// 	this.setState({ stock4: snapshot.val().Stock })
		// })

		firebase.database().ref('products').child('P5').on('value', snapshot => {
			this.setState({ stock5: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P6').on('value', snapshot => {
			this.setState({ stock6: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P7').on('value', snapshot => {
			this.setState({ stock7: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P8').on('value', snapshot => {
			this.setState({ stock8: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P9').on('value', snapshot => {
			this.setState({ stock9: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P10').on('value', snapshot => {
			this.setState({ stock10: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P11').on('value', snapshot => {
			this.setState({ stock11: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P12').on('value', snapshot => {
			this.setState({ stock12: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P13').on('value', snapshot => {
			this.setState({ stock13: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P14').on('value', snapshot => {
			this.setState({ stock14: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P15').on('value', snapshot => {
			this.setState({ stock15: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P16').on('value', snapshot => {
			this.setState({ stock16: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P17').on('value', snapshot => {
			this.setState({ stock17: snapshot.val().Stock })
		})
	}

	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	timestamp = () => {
		let newDate = new Date()
		
		let month = newDate.getMonth() + 1;
		let dateToday = newDate.getDate();
		let year = newDate.getFullYear();
		let hour = newDate.getHours();
		let mins = newDate.getMinutes();
		let sec = newDate.getSeconds();

		return (month < 10 ? ('0' + month) : month) + "-" + (dateToday < 10 ? ('0' + dateToday) : dateToday) + "-" + year + "||" + (hour < 10 ? ('0' + hour) : hour) + ":" + (mins < 10 ? ('0' + mins) : mins) + ":" + (sec < 10 ? ('0' + sec) : sec)
	}

	addP1ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product1Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P1', Sets: this.state.product1Sets, Price: this.state.price1 })
				alert("This item has been added to your cart!")

				this.setState({ product1Sets: '', price1: 0 })

				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP2ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product2Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P2', Sets: this.state.product2Sets, Price: this.state.price2 })
				alert("This item has been added to your cart!")

				this.setState({ product2Sets: '', price2: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP3ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product3Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P3', Sets: this.state.product3Sets, Price: this.state.price3 })
				alert("This item has been added to your cart!")

				this.setState({ product3Sets: '', price3: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	// addP4ToCart = async (event) => {
	// 	if (this.props.consumer.trim() !== "") {
	// 		if (this.state.product4Sets.trim() !== "") {
	// 			let id_num = this.timestamp()

	// 			firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P4', Sets: this.state.product4Sets, Price: this.state.price4 })
	// 			alert("This item has been added to your cart!")

	// 			this.setState({ product4Sets: '', price4: 0 })
				
	// 			if (window.confirm("Go to Cart?")) { this.props.goCart() }
	// 			else { return }
	// 		}
	// 		else {
	// 			alert("Kindly input the quantity you wish of this order.")
	// 		}
	// 	}
	// 	else {
	// 		alert("Kindly register an account before adding to cart!")
	// 	}
	// }

	addP5ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product5Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P5', Sets: this.state.product5Sets, Price: this.state.price5 })
				alert("This item has been added to your cart!")

				this.setState({ product5Sets: '', price5: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP6ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product6Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P6', Sets: this.state.product6Sets, Price: this.state.price6 })
				alert("This item has been added to your cart!")

				this.setState({ product6Sets: '', price6: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP7ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product7Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P7', Sets: this.state.product7Sets, Price: this.state.price7 })
				alert("This item has been added to your cart!")

				this.setState({ product7Sets: '', price7: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP8ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product8Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P8', Sets: this.state.product8Sets, Price: this.state.price8 })
				alert("This item has been added to your cart!")

				this.setState({ product8Sets: '', price8: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP9ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product9Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P9', Sets: this.state.product9Sets, Price: this.state.price9 })
				alert("This item has been added to your cart!")

				this.setState({ product9Sets: '', price9: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP10ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product10Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P10', Sets: this.state.product10Sets, Price: this.state.price10 })
				alert("This item has been added to your cart!")

				this.setState({ product10Sets: '', price10: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP11ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product11Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P11', Sets: this.state.product11Sets, Price: this.state.price11 })
				alert("This item has been added to your cart!")

				this.setState({ product11Sets: '', price11: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP12ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product12Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P12', Sets: this.state.product12Sets, Price: this.state.price12 })
				alert("This item has been added to your cart!")

				this.setState({ product12Sets: '', price12: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP13ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product13Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P13', Sets: this.state.product13Sets, Price: this.state.price13 })
				alert("This item has been added to your cart!")

				this.setState({ product13Sets: '', price13: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP14ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product14Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P14', Sets: this.state.product14Sets, Price: this.state.price14 })
				alert("This item has been added to your cart!")

				this.setState({ product14Sets: '', price14: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP15ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product15Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P15', Sets: this.state.product15Sets, Price: this.state.price15 })
				alert("This item has been added to your cart!")

				this.setState({ product15Sets: '', price15: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP16ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product16Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P16', Sets: this.state.product16Sets, Price: this.state.price16 })
				alert("This item has been added to your cart!")

				this.setState({ product16Sets: '', price16: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP17ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product17Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P17', Sets: this.state.product17Sets, Price: this.state.price17 })
				alert("This item has been added to your cart!")

				this.setState({ product17Sets: '', price17: 0 })
				
				if (window.confirm("Go to Cart?")) { this.props.goCart() }
				else { return }
			}
			else {
				alert("Kindly input the quantity you wish of this order.")
			}
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	setPrice = () => {
		if (this.state.product1Sets === '') {
			this.setState({ price1: 0 })
		} else if (this.state.product1Sets === '1') {
			this.setState({ price1: 350 })
		} else if (this.state.product1Sets === '2') {
			this.setState({ price1: 700 })
		} else if (this.state.product1Sets === '3') {
			this.setState({ price1: 1050 })
		} else if (this.state.product1Sets === '4') {
			this.setState({ price1: 1400 })
		} else if (this.state.product1Sets === '5') {
			this.setState({ price1: 1750 })
		} else if (this.state.product1Sets === '6') {
			this.setState({ price1: 2100 })
		} else if (this.state.product1Sets === '7') {
			this.setState({ price1: 2450 })
		} else if (this.state.product1Sets === '8') {
			this.setState({ price1: 2800 })
		} else if (this.state.product1Sets === '9') {
			this.setState({ price1: 3150 })
		} else if (this.state.product1Sets === '10') {
			this.setState({ price1: 3500 })
		}

		if (this.state.product2Sets === '') {
			this.setState({ price2: 0 })
		} else if (this.state.product2Sets === '1') {
			this.setState({ price2: 600 })
		} else if (this.state.product2Sets === '2') {
			this.setState({ price2: 1200 })
		} else if (this.state.product2Sets === '3') {
			this.setState({ price2: 1800 })
		} else if (this.state.product2Sets === '4') {
			this.setState({ price2: 2400 })
		} else if (this.state.product2Sets === '5') {
			this.setState({ price2: 3000 })
		} else if (this.state.product2Sets === '6') {
			this.setState({ price2: 3600 })
		} else if (this.state.product2Sets === '7') {
			this.setState({ price2: 4200 })
		} else if (this.state.product2Sets === '8') {
			this.setState({ price2: 4800 })
		} else if (this.state.product2Sets === '9') {
			this.setState({ price2: 5400 })
		} else if (this.state.product2Sets === '10') {
			this.setState({ price2: 6000 })
		}

		if (this.state.product3Sets === '') {
			this.setState({ price3: 0 })
		} else if (this.state.product3Sets === '1') {
			this.setState({ price3: 450 })
		} else if (this.state.product3Sets === '2') {
			this.setState({ price3: 900 })
		} else if (this.state.product3Sets === '3') {
			this.setState({ price3: 1350 })
		} else if (this.state.product3Sets === '4') {
			this.setState({ price3: 1800 })
		} else if (this.state.product3Sets === '5') {
			this.setState({ price3: 2250 })
		} else if (this.state.product3Sets === '6') {
			this.setState({ price3: 2700 })
		} else if (this.state.product3Sets === '7') {
			this.setState({ price3: 3150 })
		} else if (this.state.product3Sets === '8') {
			this.setState({ price3: 3600 })
		} else if (this.state.product3Sets === '9') {
			this.setState({ price3: 4050 })
		} else if (this.state.product3Sets === '10') {
			this.setState({ price3: 4500 })
		}

		// if (this.state.product4Sets === '') {
		// 	this.setState({ price4: 0 })
		// } else if (this.state.product4Sets === '1') {
		// 	this.setState({ price4: 775 })
		// } else if (this.state.product4Sets === '2') {
		// 	this.setState({ price4: 1550 })
		// } else if (this.state.product4Sets === '3') {
		// 	this.setState({ price4: 2325 })
		// } else if (this.state.product4Sets === '4') {
		// 	this.setState({ price4: 3100 })
		// } else if (this.state.product4Sets === '5') {
		// 	this.setState({ price4: 3875 })
		// } else if (this.state.product4Sets === '6') {
		// 	this.setState({ price4: 4650 })
		// } else if (this.state.product4Sets === '7') {
		// 	this.setState({ price4: 5425 })
		// } else if (this.state.product4Sets === '8') {
		// 	this.setState({ price4: 6200 })
		// } else if (this.state.product4Sets === '9') {
		// 	this.setState({ price4: 6975 })
		// } else if (this.state.product4Sets === '10') {
		// 	this.setState({ price4: 7750 })
		// }

		if (this.state.product5Sets === '') {
			this.setState({ price5: 0 })
		} else if (this.state.product5Sets === '1') {
			this.setState({ price5: 450 })
		} else if (this.state.product5Sets === '2') {
			this.setState({ price5: 900 })
		} else if (this.state.product5Sets === '3') {
			this.setState({ price5: 1350 })
		} else if (this.state.product5Sets === '4') {
			this.setState({ price5: 1800 })
		} else if (this.state.product5Sets === '5') {
			this.setState({ price5: 2250 })
		} else if (this.state.product5Sets === '6') {
			this.setState({ price5: 2700 })
		} else if (this.state.product5Sets === '7') {
			this.setState({ price5: 3150 })
		} else if (this.state.product5Sets === '8') {
			this.setState({ price5: 3600 })
		} else if (this.state.product5Sets === '9') {
			this.setState({ price5: 4050 })
		} else if (this.state.product5Sets === '10') {
			this.setState({ price5: 4500 })
		}

		if (this.state.product6Sets === '') {
			this.setState({ price6: 0 })
		} else if (this.state.product6Sets === '1') {
			this.setState({ price6: 775 })
		} else if (this.state.product6Sets === '2') {
			this.setState({ price6: 1550 })
		} else if (this.state.product6Sets === '3') {
			this.setState({ price6: 2325 })
		} else if (this.state.product6Sets === '4') {
			this.setState({ price6: 3100 })
		} else if (this.state.product6Sets === '5') {
			this.setState({ price6: 3875 })
		} else if (this.state.product6Sets === '6') {
			this.setState({ price6: 4650 })
		} else if (this.state.product6Sets === '7') {
			this.setState({ price6: 5425 })
		} else if (this.state.product6Sets === '8') {
			this.setState({ price6: 6200 })
		} else if (this.state.product6Sets === '9') {
			this.setState({ price6: 6975 })
		} else if (this.state.product6Sets === '10') {
			this.setState({ price6: 7750 })
		}

		if (this.state.product7Sets === '') {
			this.setState({ price7: 0 })
		} else if (this.state.product7Sets === '1') {
			this.setState({ price7: 775 })
		} else if (this.state.product7Sets === '2') {
			this.setState({ price7: 1550 })
		} else if (this.state.product7Sets === '3') {
			this.setState({ price7: 2325 })
		} else if (this.state.product7Sets === '4') {
			this.setState({ price7: 3100 })
		} else if (this.state.product7Sets === '5') {
			this.setState({ price7: 3875 })
		} else if (this.state.product7Sets === '6') {
			this.setState({ price7: 4650 })
		} else if (this.state.product7Sets === '7') {
			this.setState({ price7: 5425 })
		} else if (this.state.product7Sets === '8') {
			this.setState({ price7: 6200 })
		} else if (this.state.product7Sets === '9') {
			this.setState({ price7: 6975 })
		} else if (this.state.product7Sets === '10') {
			this.setState({ price7: 7750 })
		}

		if (this.state.product8Sets === '') {
			this.setState({ price8: 0 })
		} else if (this.state.product8Sets === '1') {
			this.setState({ price8: 850 })
		} else if (this.state.product8Sets === '2') {
			this.setState({ price8: 1700 })
		} else if (this.state.product8Sets === '3') {
			this.setState({ price8: 2550 })
		} else if (this.state.product8Sets === '4') {
			this.setState({ price8: 3400 })
		} else if (this.state.product8Sets === '5') {
			this.setState({ price8: 4250 })
		} else if (this.state.product8Sets === '6') {
			this.setState({ price8: 5100 })
		} else if (this.state.product8Sets === '7') {
			this.setState({ price8: 5950 })
		} else if (this.state.product8Sets === '8') {
			this.setState({ price8: 6800 })
		} else if (this.state.product8Sets === '9') {
			this.setState({ price8: 7650 })
		} else if (this.state.product8Sets === '10') {
			this.setState({ price8: 8500 })
		}

		if (this.state.product9Sets === '') {
			this.setState({ price9: 0 })
		} else if (this.state.product9Sets === '1') {
			this.setState({ price9: 850 })
		} else if (this.state.product9Sets === '2') {
			this.setState({ price9: 1700 })
		} else if (this.state.product9Sets === '3') {
			this.setState({ price9: 2550 })
		} else if (this.state.product9Sets === '4') {
			this.setState({ price9: 3400 })
		} else if (this.state.product9Sets === '5') {
			this.setState({ price9: 4250 })
		} else if (this.state.product9Sets === '6') {
			this.setState({ price9: 5100 })
		} else if (this.state.product9Sets === '7') {
			this.setState({ price9: 5950 })
		} else if (this.state.product9Sets === '8') {
			this.setState({ price9: 6800 })
		} else if (this.state.product9Sets === '9') {
			this.setState({ price9: 7650 })
		} else if (this.state.product9Sets === '10') {
			this.setState({ price9: 8500 })
		}

		if (this.state.product10Sets === '') {
			this.setState({ price10: 0 })
		} else if (this.state.product10Sets === '1') {
			this.setState({ price10: 450 })
		} else if (this.state.product10Sets === '2') {
			this.setState({ price10: 900 })
		} else if (this.state.product10Sets === '3') {
			this.setState({ price10: 1350 })
		} else if (this.state.product10Sets === '4') {
			this.setState({ price10: 1800 })
		} else if (this.state.product10Sets === '5') {
			this.setState({ price10: 2250 })
		} else if (this.state.product10Sets === '6') {
			this.setState({ price10: 2700 })
		} else if (this.state.product10Sets === '7') {
			this.setState({ price10: 3150 })
		} else if (this.state.product10Sets === '8') {
			this.setState({ price10: 3600 })
		} else if (this.state.product10Sets === '9') {
			this.setState({ price10: 4050 })
		} else if (this.state.product10Sets === '10') {
			this.setState({ price10: 4500 })
		}

		if (this.state.product11Sets === '') {
			this.setState({ price11: 0 })
		} else if (this.state.product11Sets === '1') {
			this.setState({ price11: 850 })
		} else if (this.state.product11Sets === '2') {
			this.setState({ price11: 1700 })
		} else if (this.state.product11Sets === '3') {
			this.setState({ price11: 2550 })
		} else if (this.state.product11Sets === '4') {
			this.setState({ price11: 3400 })
		} else if (this.state.product11Sets === '5') {
			this.setState({ price11: 4250 })
		} else if (this.state.product11Sets === '6') {
			this.setState({ price11: 5100 })
		} else if (this.state.product11Sets === '7') {
			this.setState({ price11: 5950 })
		} else if (this.state.product11Sets === '8') {
			this.setState({ price11: 6800 })
		} else if (this.state.product11Sets === '9') {
			this.setState({ price11: 7650 })
		} else if (this.state.product11Sets === '10') {
			this.setState({ price11: 8500 })
		}

		if (this.state.product12Sets === '') {
			this.setState({ price12: 0 })
		} else if (this.state.product12Sets === '1') {
			this.setState({ price12: 850 })
		} else if (this.state.product12Sets === '2') {
			this.setState({ price12: 1700 })
		} else if (this.state.product12Sets === '3') {
			this.setState({ price12: 2550 })
		} else if (this.state.product12Sets === '4') {
			this.setState({ price12: 3400 })
		} else if (this.state.product12Sets === '5') {
			this.setState({ price12: 4250 })
		} else if (this.state.product12Sets === '6') {
			this.setState({ price12: 5100 })
		} else if (this.state.product12Sets === '7') {
			this.setState({ price12: 5950 })
		} else if (this.state.product12Sets === '8') {
			this.setState({ price12: 6800 })
		} else if (this.state.product12Sets === '9') {
			this.setState({ price12: 7650 })
		} else if (this.state.product12Sets === '10') {
			this.setState({ price12: 8500 })
		}

		if (this.state.product13Sets === '') {
			this.setState({ price13: 0 })
		} else if (this.state.product13Sets === '1') {
			this.setState({ price13: 450 })
		} else if (this.state.product13Sets === '2') {
			this.setState({ price13: 900 })
		} else if (this.state.product13Sets === '3') {
			this.setState({ price13: 1350 })
		} else if (this.state.product13Sets === '4') {
			this.setState({ price13: 1800 })
		} else if (this.state.product13Sets === '5') {
			this.setState({ price13: 2250 })
		} else if (this.state.product13Sets === '6') {
			this.setState({ price13: 2700 })
		} else if (this.state.product13Sets === '7') {
			this.setState({ price13: 3150 })
		} else if (this.state.product13Sets === '8') {
			this.setState({ price13: 3600 })
		} else if (this.state.product13Sets === '9') {
			this.setState({ price13: 4050 })
		} else if (this.state.product13Sets === '10') {
			this.setState({ price13: 4500 })
		}

		if (this.state.product14Sets === '') {
			this.setState({ price14: 0 })
		} else if (this.state.product14Sets === '1') {
			this.setState({ price14: 850 })
		} else if (this.state.product14Sets === '2') {
			this.setState({ price14: 1700 })
		} else if (this.state.product14Sets === '3') {
			this.setState({ price14: 2550 })
		} else if (this.state.product14Sets === '4') {
			this.setState({ price14: 3400 })
		} else if (this.state.product14Sets === '5') {
			this.setState({ price14: 4250 })
		} else if (this.state.product14Sets === '6') {
			this.setState({ price14: 5100 })
		} else if (this.state.product14Sets === '7') {
			this.setState({ price14: 5950 })
		} else if (this.state.product14Sets === '8') {
			this.setState({ price14: 6800 })
		} else if (this.state.product14Sets === '9') {
			this.setState({ price14: 7650 })
		} else if (this.state.product14Sets === '10') {
			this.setState({ price14: 8500 })
		}

		if (this.state.product15Sets === '') {
			this.setState({ price15: 0 })
		} else if (this.state.product15Sets === '1') {
			this.setState({ price15: 450 })
		} else if (this.state.product15Sets === '2') {
			this.setState({ price15: 900 })
		} else if (this.state.product15Sets === '3') {
			this.setState({ price15: 1350 })
		} else if (this.state.product15Sets === '4') {
			this.setState({ price15: 1800 })
		} else if (this.state.product15Sets === '5') {
			this.setState({ price15: 2250 })
		} else if (this.state.product15Sets === '6') {
			this.setState({ price15: 2700 })
		} else if (this.state.product15Sets === '7') {
			this.setState({ price15: 3150 })
		} else if (this.state.product15Sets === '8') {
			this.setState({ price15: 3600 })
		} else if (this.state.product15Sets === '9') {
			this.setState({ price15: 4050 })
		} else if (this.state.product15Sets === '10') {
			this.setState({ price15: 4500 })
		}

		if (this.state.product16Sets === '') {
			this.setState({ price16: 0 })
		} else if (this.state.product16Sets === '1') {
			this.setState({ price16: 850 })
		} else if (this.state.product16Sets === '2') {
			this.setState({ price16: 1700 })
		} else if (this.state.product16Sets === '3') {
			this.setState({ price16: 2550 })
		} else if (this.state.product16Sets === '4') {
			this.setState({ price16: 3400 })
		} else if (this.state.product16Sets === '5') {
			this.setState({ price16: 4250 })
		} else if (this.state.product16Sets === '6') {
			this.setState({ price16: 5100 })
		} else if (this.state.product16Sets === '7') {
			this.setState({ price16: 5950 })
		} else if (this.state.product16Sets === '8') {
			this.setState({ price16: 6800 })
		} else if (this.state.product16Sets === '9') {
			this.setState({ price16: 7650 })
		} else if (this.state.product16Sets === '10') {
			this.setState({ price16: 8500 })
		}

		if (this.state.product17Sets === '') {
			this.setState({ price17: 0 })
		} else if (this.state.product17Sets === '1') {
			this.setState({ price17: 450 })
		} else if (this.state.product17Sets === '2') {
			this.setState({ price17: 900 })
		} else if (this.state.product17Sets === '3') {
			this.setState({ price17: 1350 })
		} else if (this.state.product17Sets === '4') {
			this.setState({ price17: 1800 })
		} else if (this.state.product17Sets === '5') {
			this.setState({ price17: 2250 })
		} else if (this.state.product17Sets === '6') {
			this.setState({ price17: 2700 })
		} else if (this.state.product17Sets === '7') {
			this.setState({ price17: 3150 })
		} else if (this.state.product17Sets === '8') {
			this.setState({ price17: 3600 })
		} else if (this.state.product17Sets === '9') {
			this.setState({ price17: 4050 })
		} else if (this.state.product17Sets === '10') {
			this.setState({ price17: 4500 })
		}
	}

	stopPropagation = (event) => event.stopPropagation()

	render() {
		return ( 
			<div>
				<section id="products">

					<div id="productHeader"> <h1>Our Product Portfolio</h1> </div>

					<div id="displayProducts">
						<div id="showProducts" class="fade-in">	

						    <button onClick={() => this.setState({ modal1: true })}>
						    	<img src="/images/p1.jpg" width="100%;"/>
								<div class="productItem">
						    		<h2>Classic Cinammon Rolls: 6pcs</h2>
									<p>P350.00</p>
							    </div>
							</button>

						    <button onClick={() => this.setState({ modal2: true })}>
						    	<img src="/images/p2.jpg" width="100%;"/>
								<div class="productItem">
									<h2>Classic Cinammon Rolls: 12pcs</h2>
									<p>P600.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal3: true })}>
						    	<img src="/images/p3.jpg" width="100%;" />
								<div class="productItem">
									<h2>Double Chocolate Cinammon Rolls: 6pcs</h2>
									<p>P450.00</p>
								</div>
							</button>

							{/* <button onClick={() => this.setState({ modal4: true })}>
						    	<img src="/images/p4.jpg" width="100%;"/>
								<div class="productItem">
									<h2>Double Chocolate Cinammon Rolls: 12pcs</h2>
									<p>P775.00</p>
								</div>
							</button> */}

							<button onClick={() => this.setState({ modal5: true })}>
						    	<img src="/images/p5.jpg" width="100%;" />
								<div class="productItem">
									<h2>Caramel Pecan Rolls: 6pcs</h2>
									<p>P450.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal6: true })}>
						    	<img src="/images/p6.jpg" width="100%;" />
								<div class="productItem">
									<h2>Caramel Pecan Rolls: 12pcs</h2>
									<p>P775.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal7: true })}>
						    	<img src="/images/p7.jpg" width="100%;" />
								<div class="productItem">
									<h2>Classic Cinnacake</h2>
									<p>P775.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal8: true })}>
						    	<img src="/images/p8.jpg" width="100%;" />
								<div class="productItem">
									<h2>Chocolate Cinnacake</h2>
									<p>P850.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal9: true })}>
						    	<img src="/images/p9.jpg" width="100%;" />
								<div class="productItem">
									<h2>Caramel Pecan Cinnacake</h2>
									<p>P850.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal10: true })}>
						    	<img src="/images/p10.jpg" width="100%;" />
								<div class="productItem">
									<h2>Matcha Rolls: 6pcs</h2>
									<p>P450.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal11: true })}>
						    	<img src="/images/p11.jpg" width="100%;" />
								<div class="productItem">
									<h2>Matcha Cinnacake</h2>
									<p>P850.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal12: true })}>
						    	<img src="/images/p12.jpg" width="100%;" />
								<div class="productItem">
									<h2>PB&J: 12pcs</h2>
									<p>P850.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal13: true })}>
						    	<img src="/images/p13.png" width="100%;" />
								<div class="productItem">
									<h2>PB&J: 6pcs</h2>
									<p>P450.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal14: true })}>
						    	<img src="/images/p14.jpg" width="100%;" />
								<div class="productItem">
									<h2>Double Strawberry: 12pcs</h2>
									<p>P850.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal15: true })}>
						    	<img src="/images/p15.jpg" width="100%;" />
								<div class="productItem">
									<h2>Double Strawberry: 6pcs</h2>
									<p>P450.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal16: true })}>
						    	<img src="/images/p16.jpg" width="100%;" />
								<div class="productItem">
									<h2>Strawberries and Cream Cheese: 12pcs</h2>
									<p>P850.00</p>
								</div>
							</button>

							<button onClick={() => this.setState({ modal17: true })}>
						    	<img src="/images/p17.jpg" width="100%;" />
								<div class="productItem">
									<h2>Strawberries and Cream Cheese: 6pcs</h2>
									<p>P450.00</p>
								</div>
							</button>

						</div>
					</div>

					{this.state.modal1 ?
						<div id="modal" onClick={() => this.setState({ modal1: false })}>
							<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p1.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Classic Cinammon Rolls: 6pcs</h2>
				        				<p>6 pieces of our Classic Cinammon Rolls, topped with our special cream cheese frosting. Perfect for a quick snack! Beware: It might not last too long.<br />(Good for 2-3 people)</p>
			      						{this.state.stock1 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product1Sets} name="product1Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP1ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
		      					<div id="modal-footer"></div>
		    				</div>
			 			</div>
			 		: null}

			 		{this.state.modal2 ?
						<div id="modal" onClick={() => this.setState({ modal2: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p2.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Classic Cinammon Rolls: 12pcs</h2>
				        				<p>12 pieces of our Classic Cinammon Rolls, topped with our special cream cheese frosting. This is absolutely perfect for gift giving and sharing love.<br />(Good for 3-5 people)</p>
			      						{this.state.stock2 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product2Sets} name="product2Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP2ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

			 		{this.state.modal3 ?
						<div id="modal" onClick={() => this.setState({ modal3: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p3.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Double Chocolate Cinammon Rolls: 6pcs</h2>
				        				<p>A twist on a classic, filled to the brim and topped with only quality Malagos Chocolate. Good for sharing or two meals for one hungry chocolate lover.<br />(Good for 2-3 people)</p>
			      						{this.state.stock3 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product3Sets} name="product3Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP3ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

			 		{/* {this.state.modal4 ?
						<div id="modal" onClick={() => this.setState({ modal4: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p4.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Double Chocolate Cinammon Rolls: 12pcs</h2>
				        				<p>A twist on a classic, filled to the brim and topped with only quality Malagos Chocolate. Good for serving one hungry family!<br />(Good for 3-5 people)</p>
			      						{this.state.stock4 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product4Sets} name="product4Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP4ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null} */}

					{this.state.modal5 ?
						<div id="modal" onClick={() => this.setState({ modal5: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p5.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Caramel Pecan Rolls: 6pcs</h2>
				        				<p>Ooey, gooey, and topped with toasted pecans. Our box of 6 is surely a throwback with classic flavors that remind us of unforgettable memories.<br />(Good for 2-3 people)</p>
			      						{this.state.stock5 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product5Sets} name="product5Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP5ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal6 ?
						<div id="modal" onClick={() => this.setState({ modal6: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p6.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Caramel Pecan Rolls: 6pcs</h2>
				        				<p>Our box of 12 Caramael Pecan Rolls may be cinnful but who could resist the gooey caramel and chunky pecans this favorite brings?<br />(Good for 3-5 people)</p>
			      						{this.state.stock6 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product6Sets} name="product6Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP6ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal7 ?
						<div id="modal" onClick={() => this.setState({ modal7: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p7.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Classic Cinnacake</h2>
				        				<p>Our Classic Cinnamon Rolls, but in CAKE form. No better way to celebrate with a giant cinnamon roll!</p>
			      						{this.state.stock7 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product7Sets} name="product7Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP7ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal8 ?
						<div id="modal" onClick={() => this.setState({ modal8: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p8.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Chocolate Cinnacake</h2>
				        				<p>Giant Choco Rolls topped with rich and luscious Malagos Chocolate.</p>
			      						{this.state.stock8 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product8Sets} name="product8Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP8ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal9 ?
						<div id="modal" onClick={() => this.setState({ modal9: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p9.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Caramel Pecan Cinnacake</h2>
				        				<p>Ooey and gooey, but most importantly BIG!!!</p>
			      						{this.state.stock9 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product9Sets} name="product9Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP9ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal10 ?
						<div id="modal" onClick={() => this.setState({ modal10: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p10.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Matcha Rolls: 6pcs</h2>
				        				<p>Bitter matcha and sweet white chocolate ganache - the perfect balance! Get your box of 6, good for 2-3 people or for one hungry person!</p>
			      						{this.state.stock10 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product10Sets} name="product10Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP10ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal11 ?
						<div id="modal" onClick={() => this.setState({ modal11: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p11.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Matcha Cinnacake</h2>
				        				<p>Matcha lover? This cake is for you! Get your bitter matcha and sweet white chocolate ganache all in one cake!</p>
			      						{this.state.stock11 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product11Sets} name="product11Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP11ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal12 ?
						<div id="modal" onClick={() => this.setState({ modal12: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p12.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>PB&J: 12pcs</h2>
				        				<p>A sweet strawberry reduction, topped with creamy peanut butter, and all over a glorious roll!</p>
			      						{this.state.stock12 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product12Sets} name="product12Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP12ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal13 ?
						<div id="modal" onClick={() => this.setState({ modal13: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p13.png" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>PB&J: 6pcs</h2>
				        				<p>What’s better than a peanut butter and jelly sandwich? A peanut butter and jelly roll! Made with homemade jam and topped with creamy peanut butter, you’ll surely want another bite!</p>
			      						{this.state.stock13 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product13Sets} name="product13Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP13ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal14 ?
						<div id="modal" onClick={() => this.setState({ modal14: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p14.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Double Strawberry: 12pcs</h2>
				        				<p>Strawberries on strawberries! This roll is not only filled with our special jam but also topped with our homemade frosting! Perfect for over a cup of coffee.</p>
			      						{this.state.stock14 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product14Sets} name="product14Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP14ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal15 ?
						<div id="modal" onClick={() => this.setState({ modal15: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p15.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Double Strawberry: 6pcs</h2>
				        				<p>Who couldn’t get enough of strawberries? This roll is filled with our homemade jam and topped with our special ganache! Each bite is a strawberry overload!</p>
			      						{this.state.stock15 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product15Sets} name="product15Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP15ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal16 ?
						<div id="modal" onClick={() => this.setState({ modal16: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p16.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Strawberries and Cream Cheese: 12pcs</h2>
				        				<p>Our classic frosting, but this time topped on our newest strawberry roll! It’s filled with strawberries and has a hint of lemon for that extra zing!</p>
			      						{this.state.stock16 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product16Sets} name="product16Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP16ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

					{this.state.modal17 ?
						<div id="modal" onClick={() => this.setState({ modal17: false })}>
		    				<div id="modal-content" onClick={this.stopPropagation}>
		     					<div id="modal-header"></div>
			      				<div id="modal-body">
			      					<img src="/images/p17.jpg" width="45%;"/>
			      					<div id="modalDescription">
			      						<h2>Strawberries and Cream Cheese: 6pcs</h2>
				        				<p>Ever heard of strawberries and cream? We took it a step further and our rolls with cream cheese! The perfect combination for a warm afternoon. </p>
			      						{this.state.stock17 ? 
			      							<div>
			      								<select class="modalSets" onChange={this.handleChange} value={this.state.product17Sets} name="product17Sets">
													<option value="">--Quantity of Order--</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
												</select>
			      								<button onClick={this.addP17ToCart}>Add To Cart</button>
			      							</div>
			      						: <p>(Out of Stock)</p>}
			      					</div>
			      				</div>
			      				<div id="modal-footer"></div>
			    			</div>
			 			</div>
			 		: null}

				</section>
			</div>
		)
	}
}

export default Products