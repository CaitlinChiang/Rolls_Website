import React, { useState } from 'react'
import Slider1 from './SliderP1'
import Slider2 from './SliderP2'
import Slider3 from './SliderP3'


function Slider() {

	let sliderContents = [<Slider1 />, <Slider2 />, <Slider3 />]
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