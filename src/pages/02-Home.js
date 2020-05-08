import React from 'react'


function Slider() {
	return (
		<div id="slider">
			<figure>
				<img src="/images/bg1.jpg" />
				<img src="/images/bg2.jpg" />
				<img src="/images/bg3.jpg" />
				<img src="/images/bg4.jpg" />
				<img src="/images/bg1.jpg" />
			</figure>
		</div>
	)
}

function Home() {
	return (
		<div>
			<section id="home">
				{Slider()}
				<div class="container fade-in">
					<h1>ROLLS</h1>
				</div>
				<a href="#about"><img class="downArrow" src="https://image.flaticon.com/icons/svg/2316/2316598.svg" /></a>
			</section>

			<section id="about">
				<div class="container">
					<h1>ABOUT ROLLS</h1>
					<h4>About Paragraph</h4>
					<div id="inquiries">
						<h5>For Inquiries:</h5>
						<h6>Facebook: <a href="https://www.facebook.com/officialrolls.ph/">Rolls</a></h6>
						<h6>Phone: 0917 535 0923</h6>
						<h6>Email: officialrolls.ph@gmail.com</h6>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home