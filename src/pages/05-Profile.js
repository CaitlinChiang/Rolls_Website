import React, { Component } from 'react'
import * as firebase from 'firebase'
import '../services/firebaseConfig'
import Cart from '../components/Cart'


class Profile extends Component {
	state = {
		DisplayProfile: true,
		DisplayCart: false,

		loginEmail: '',
		loginPassword: '',

		registerEmail: '',
		registerPassword: ''
	}

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	handleRegisterSubmit = async (event) => {
		event.preventDefault()
		if (this.state.registerEmail.trim() !== "" && this.state.registerPassword.trim() !== "") {
			await firebase.database().ref('customers').push({
				registerEmail: this.state.registerEmail,
				registerPassword: this.state.registerPassword
			})
			this.setState({ 
				DisplayProfile: false,
				DisplayCart: true
			})
		} else {
			this.setState({ 
				registerEmail: '',
				registerPassword: ''
			})
			alert('Kindly fill in all the input fields.')
		}
	}

	render() {
		return (
			<div>
				{this.state.DisplayProfile ? 
					<section id="profile">
						<div class="container">
							<div id="login">
								<p>Login to see your shopping cart!</p>
								<form onSubmit={this.handleLoginSubmit} autocomplete="off" id="loginSubmit">
									<input onChange={this.handleChange} value={this.state.loginEmail} name="loginEmail" type="text" placeholder="Email Address" />
									<input onChange={this.handleChange} value={this.state.loginPassword} name="loginPassword" type="text" placeholder="Account Password" />
									<button>Login</button>
								</form>
							</div>
							<div id="register">
								<p>Don't have an account? Register now!</p>
								<form onSubmit={this.handleRegisterSubmit} autocomplete="off" id="registerSubmit">
									<input onChange={this.handleChange} value={this.state.registerEmail} name="registerEmail" type="text" placeholder="Email Address" />
									<input onChange={this.handleChange} value={this.state.registerPassword} name="registerPassword" type="text" placeholder="Create Account Password" />
									<button>Register</button>
								</form>
							</div>
						</div>
					</section>
				: null }
				{this.state.DisplayCart ? <Cart /> : null}
			</div>
		)
	}
}

export default Profile