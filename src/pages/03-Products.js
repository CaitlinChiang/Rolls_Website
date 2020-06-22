import React, { Component } from 'react'
import * as firebase from 'firebase'


class Products extends Component {
	state = {
		consumer: this.props.consumer,
		
		modal1: false,       
		stock1: true,

		modal2: false,
		stock2: true
	}

	componentDidMount = async () => {
		firebase.database().ref('products').child('P1').on('value', snapshot => {
			this.setState({ stock1: snapshot.val().Stock })
		})

		firebase.database().ref('products').child('P2').on('value', snapshot => {
			this.setState({ stock2: snapshot.val().Stock })
		})
	}

	addP1ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').push('P1')
			alert("This item has been added to your cart!")

			if (window.confirm("Go to Cart?")) { this.props.goCart() }
			else { return }
		}
		else {
			alert("Kindly register an account before adding to cart!")
		}
	}

	addP2ToCart = async (event) => {
		if (this.props.consumer.trim() !== "") {
			firebase.database().ref(`users/${this.props.consumer}`).child('Pending Orders').push('P2')
			alert("This item has been added to your cart!")
			
			if (window.confirm("Go to Cart?")) { this.props.goCart() }
			else { return }
		}
		else {
			alert("Kindly register an account before adding to cart!")
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
			      						{this.state.stock1 ? <button onClick={this.addP1ToCart}>Add To Cart</button> : <p>(Out of Stock)</p>}
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
			      						{this.state.stock2 ? <button onClick={this.addP2ToCart}>Add To Cart</button> : <p>(Out of Stock)</p>}
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