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
					<div id="aboutRolls" class="overflow-container">
						<h4>We've always loved baking. It came as second nature to us. We always baked together during the holidays and would give out our creations to family and friends. Since we were both 16 when we first started it November 2019, we wanted a bit of entrepreneurial experience. We decided to open up a small online business focusing on - you guessed it! - Cinnamon Rolls.
						<br /><br />Being in high school and managing a business was very challenging. This really tested our time management and would often lead to sleepless nights and early mornings. Since we were young, we still had many aspects to learn and we believe that this helped shape both us and our business. 
						<br /><br />Cinammon Rolls was one of our favorite foods but we wanted to experiment to create a Roll that was both timeless and ageless. We tried countless tweaks and improvements to come up with the Rolls we serve today!
						<br /><br />Today, we make sure each Roll is handmade with love and is individually checked for their quality. Before sending them out, we carefully roll each one and shower them with our creamy frosting. All our Rolls mirror our love, passion, and commitment and we are sure that you will be able to taste it in every bite!
						<br /><br />Always with love, Raffy and Francine.
						</h4>
					</div>
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