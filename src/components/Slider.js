import React from 'react'


function Slider() {
	let sliderContents = [1, 2, 3]

	return (
		<div>
			<div class="container" id="product_slider">
			{sliderContents.map((item, index) => {
				return (
					<div key={index} className="slide">
						{item}
					</div>
				)
			})}
			<button id="goLeft">Left</button>
			<button id="goRight">Right</button>
			</div>
		</div>
	)
}

export default Slider