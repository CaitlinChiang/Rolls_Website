import React, { useState } from 'react'

import p1 from './p1.jpg'
import p2 from './p2.jpg'
import p3 from './p3.jpg'


function productImages(src) {
	let imgStyles = {
		width: 70 + "%",
		height: "auto"
	}
	let cartButtonStyle = {
		left: 50 + "%",
		height: "auto" 
	}
	return (
		<div>
			<img src={src} style={imgStyles} />
			<button style={cartButtonStyle}></button>
		</div>
	)
}

function Slider() {

	let sliderContents = [productImages(p1), productImages(p2), productImages(p3)]
	const [x, setX] = useState(0)

	const goLeft = () => {
		x === 0 ? setX(-100 * (sliderContents.length - 1)) : setX(x + 100)
	}

	const goRight = () => {
		x === -100 * (sliderContents.length - 1) ? setX(0) : setX(x - 100)
	}

	return (
		<div>
			<div class="container" id="product_slider">
				{sliderContents.map((item, index) => {
					return (
						<div key={index} className="slide" style={{ transform: `translateX(${x}%)`}}>
							{item}
						</div>
					)
				})}
				<button id="goLeft" onClick={goLeft}><i class="arrow left"></i></button>
				<button id="goRight" onClick={goRight}><i class="arrow right"></i></button>
			</div>
		</div>
	)
}

export default Slider