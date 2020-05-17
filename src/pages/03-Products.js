import React, { Component } from 'react'
import Slider from '../components/Slider' 


class Products extends Component {
	state = {
		consumer: this.props.consumer
	}

	render() {
		return ( 
			<div>
				<section id="products">
					<h1>PRODUCTS</h1>
					<Slider consumer={this.props.consumer} />
				</section>
			</div>
		)
	}
}

export default Products