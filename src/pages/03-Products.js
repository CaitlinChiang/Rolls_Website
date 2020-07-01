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

		modal4: false,
		stock4: true,
		product4Sets: '',
		price4: 0,
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

		firebase.database().ref('products').child('P4').on('value', snapshot => {
			this.setState({ stock4: snapshot.val().Stock })
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

	addP4ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			if (this.state.product4Sets.trim() !== "") {
				let id_num = this.timestamp()

				firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').child(`${id_num}`).update({ Product: 'P4', Sets: this.state.product4Sets, Price: this.state.price4 })
				alert("This item has been added to your cart!")

				this.setState({ product4Sets: '', price4: 0 })
				
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

		if (this.state.product4Sets === '') {
			this.setState({ price4: 0 })
		} else if (this.state.product4Sets === '1') {
			this.setState({ price4: 775 })
		} else if (this.state.product4Sets === '2') {
			this.setState({ price4: 1550 })
		} else if (this.state.product4Sets === '3') {
			this.setState({ price4: 2325 })
		} else if (this.state.product4Sets === '4') {
			this.setState({ price4: 3100 })
		} else if (this.state.product4Sets === '5') {
			this.setState({ price4: 3875 })
		} else if (this.state.product4Sets === '6') {
			this.setState({ price4: 4650 })
		} else if (this.state.product4Sets === '7') {
			this.setState({ price4: 5425 })
		} else if (this.state.product4Sets === '8') {
			this.setState({ price4: 6200 })
		} else if (this.state.product4Sets === '9') {
			this.setState({ price4: 6975 })
		} else if (this.state.product4Sets === '10') {
			this.setState({ price4: 7750 })
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

							<button onClick={() => this.setState({ modal4: true })}>
						    	<img src="/images/p4.jpg" width="100%;"/>
								<div class="productItem">
									<h2>Double Chocolate Cinammon Rolls: 12pcs</h2>
									<p>P775.00</p>
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

			 		{this.state.modal4 ?
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
			 		: null}

				</section>
			</div>
		)
	}
}

export default Products