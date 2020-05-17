import React, { Component } from 'react'
import * as firebase from 'firebase'
import '../services/firebaseConfig'
import Cart from '../components/Cart' 
import Slider from '../components/Slider'


class Profile extends Component {
	state = {
		loginEmail: '',         loginPassword: '',               password: '',

		registerEmail: '',      registerPassword: '',      

		registerUsername: '',   loginUsername: '',

		users: [],              consumer: this.props.consumer,

		pendingOrders: [],      deliveredOrders: [],
	} 

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	handleRegisterSubmit = async (event) => {
		event.preventDefault()
		//check the database if the user and email already exists
		if (this.state.registerUsername.trim() !== "" && this.state.registerEmail.trim() !== "" && this.state.registerPassword.trim() !== "") {
			if (!this.state.registerUsername.includes('.') && !this.state.registerUsername.includes('#') && !this.state.registerUsername.includes('$') && !this.state.registerUsername.includes('[') && !this.state.registerUsername.includes(']')) {
				firebase.database().ref('users').child(`${this.state.registerUsername}`).once('value', snapshot => {
					if (!snapshot.exists()) {
						if (this.state.registerPassword.length >= 8) {
							firebase.database().ref(`users/${this.state.registerUsername}`).child('Account Details').update({
								registerEmail: this.state.registerEmail,
								registerPassword: this.state.registerPassword
							})
							this.props.data.setUser(this.state.registerUsername)
						} 
						else { alert('Password must be at least 8 characters long.') }
					}
					else if (snapshot.exists()) {
						alert("This username has already been registered!")
					}
				})
			} 
			else { alert("Please ensure that your username does not contain symbols.") }
		} 
		else { alert("Please fill in all input fields.") }
	}

	handleLoginSubmit = async (event) => {
		event.preventDefault()
		//check the database if the user's email and password match up, and if it exists
		if (this.state.loginUsername.trim() !== "" && this.state.loginPassword.trim() !== "") {
			firebase.database().ref('users').on('value', snapshot => {
				if (!snapshot.hasChild(this.state.loginUsername)) {
					alert("This username has not been registered.")
				} 
				else if (snapshot.hasChild(this.state.loginUsername)) {
					firebase.database().ref(`users/${this.state.loginUsername}`).child('Account Details').on('value', snapshot => {
						this.setState({ password: snapshot.val().registerPassword })
					})

					if (this.state.loginPassword === this.state.password) {
						this.props.data.setUser(this.state.loginUsername)
					}
					else if (this.state.loginPassword !== this.state.password) {
						alert('Please input the correct password.')
					}
				}
			})
		} 
		else { alert("Please fill in all input fields.") }
	}

	render() {
		return (
			<div>
				{this.props.consumer.trim() === "" ? 
					<section id="profile">
						<div class="container">
							<div id="login">
								<p>Login to see your shopping cart!</p>
								<form onSubmit={this.handleLoginSubmit} autocomplete="off" id="loginSubmit">
									<input onChange={this.handleChange} value={this.state.loginUsername} name="loginUsername" type="text" placeholder="Username" />
									<input onChange={this.handleChange} value={this.state.loginPassword} name="loginPassword" type="text" placeholder="Account Password" />
									<br /><button>Login</button>
								</form>
							</div>
							<div id="register">
								<p>Don't have an account? Register now!</p>
								<form onSubmit={this.handleRegisterSubmit} autocomplete="off" id="registerSubmit">
									<input onChange={this.handleChange} value={this.state.registerUsername} name="registerUsername" type="text" placeholder="Username" />
									<input onChange={this.handleChange} value={this.state.registerEmail} name="registerEmail" type="text" placeholder="Email Address" />
									<input onChange={this.handleChange} value={this.state.registerPassword} name="registerPassword" type="text" placeholder="8 Character Password" />
									<br /><button>Register</button>
								</form>
							</div>
							<div id="logoutNote">
								<p>Automatic logout once the page is refreshed in order to ensure secured data.</p>
							</div>
						</div>
					</section>
				: <Cart consumer={this.props.consumer} /> }
			</div>
		)
	}
}

export default Profile