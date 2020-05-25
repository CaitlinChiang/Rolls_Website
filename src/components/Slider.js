import React, { Component } from 'react'
import * as firebase from 'firebase'


class Slider extends Component {
	state = {
		sliderContents: [<Slider1 consumer={this.props.consumer} />, <Slider2 consumer={this.props.consumer} />],
		x: 0,

		consumer: this.props.consumer
	}

	goLeft = () => { this.state.x === 0 ? this.setState({ x: -100 * (this.state.sliderContents.length - 1) }) : this.setState({ x: this.state.x + 100 }) }

	goRight = () => { this.state.x === -100 * (this.state.sliderContents.length - 1) ? this.setState({ x: 0 }) : this.setState({ x: this.state.x - 100 }) }

	render() {
		return (
			<div>
				<div class="container" id="product_slider">
					{this.state.sliderContents.map((item, index) => {
						return <div key={index} className="slide" style={{ transform: `translateX(${this.state.x}%)`}}> {item} </div>
					})}
					<button id="goLeft" onClick={this.goLeft}><i class="arrow left"></i></button>
					<button id="goRight" onClick={this.goRight}><i class="arrow right"></i></button>
				</div>
			</div>
		)
	}
}

export default Slider


//Product 1
class Slider1 extends Component {
	state = {
		stock: true,
		consumer: this.props.consumer
	}

	componentDidMount = async () => {
		firebase.database().ref('products').child('P1').on('value', snapshot => {
			this.setState({ stock: snapshot.val().Stock })
		})
	}

	addToCart = async (event) => {
		{this.state.consumer.trim() !== "" ? firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').push('P1')
		: alert("Kindly register an account before adding to cart!") }
	}

	render() {
		return (
			<div>
				<div id="product_description">
					<p>Classic Cinnamon Rolls: 6pcs - P350.00</p>
					{this.state.stock ?
						<div>
							<p>(In Stock)</p>
							<button class="ripple" onClick={this.addToCart}>Add To Cart</button>
						</div>
					: <p>(Out of Stock)</p>}
				</div>
				<div id="productImage">
					<img src="/images/p1.jpg" />
				</div>
			</div>
		)
	}
}

//Product 2
class Slider2 extends Component {
	state = {
		stock: true,
		consumer: this.props.consumer
	}

	componentDidMount = async () => {
		firebase.database().ref('products').child('P2').on('value', snapshot => {
			this.setState({ stock: snapshot.val().Stock })
		})
	}

	addToCart = async (event) => {
		{this.state.consumer.trim() !== "" ? firebase.database().ref(`users/${this.state.consumer}`).child('Pending Orders').push('P2')
		: alert("Kindly register an account before adding to cart!") }
	}

	render() {
		return (
			<div>
				<div id="product_description">
					<p>Classic Cinnamon Rolls: 12pcs - P600.00</p>
					{this.state.stock ?
						<div>
							<p>(In Stock)</p>
							<button class="ripple" onClick={this.addToCart}>Add To Cart</button>
						</div>
					: <p>(Out of Stock)</p>}
				</div>
				<div id="productImage">
					<img src="/images/p2.jpg" />
				</div>
			</div>
		)
	}
}