import React, { Component } from 'react'
import * as firebase from 'firebase'
import '../services/firebaseConfig'
import Cart from '../components/Cart' 


class Profile extends Component {
	state = {
		DisplayProfile: false,  DisplayCart: true,

		loginEmail: '',         loginPassword: '',

		registerEmail: '',      registerPassword: '',

		users: []
	}

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	componentDidMount = async () => {
		firebase.database().ref('users').on('value', snapshot => {
			let users = []
			snapshot.forEach((snap) => { users.push(snap.val()) })
			this.setState({ users })
		})
	}

	handleRegisterSubmit = async (event) => {
		event.preventDefault()
		let checkUser = this.state.users.map(user => user.registerEmail)
		if (checkUser.includes(this.state.registerEmail)) {
			alert("This email has already been registered!") 
		} else {
			if (this.state.registerEmail.trim() !== "" && this.state.registerPassword.trim() !== "") {
				if (this.state.registerPassword.length >= 8) {
					await firebase.database().ref('users').push({
						registerEmail: this.state.registerEmail,
						registerPassword: this.state.registerPassword
					})
					this.setState({ DisplayProfile: false, DisplayCart: true })
				} else { 
					alert('Password must be at least 8 characters long.') 
				}
			} else { 
				alert('Kindly fill in all the input fields.') 
			}
		}
	}

	handleLoginSubmit = async (event) => {
		event.preventDefault()
		//check the database if the users' emails and passwords match up, and if it exists
		let checkEmails = this.state.users.map(user => user.registerEmail)
		let checkPasswords = this.state.users.map(user => user.registerPassword)
		if (!checkEmails.includes(this.state.loginEmail) && !checkPasswords.includes(this.state.loginPassword)) {
			alert("Kindly input the correct email and password")
		} else {
			firebase.database().ref('users').on('value', snapshot => {
				snapshot.forEach((snap) => {
					if (snap.val().registerEmail == this.state.loginEmail && snap.val().registerPassword == this.state.loginPassword) {
						this.setState({ DisplayProfile: false, DisplayCart: true })
					} else if (snap.val().registerEmail !== this.state.loginEmail && snap.val().registerPassword == this.state.loginPassword) {
						alert("This email has not been registered.")
					} else if (snap.val().registerEmail == this.state.loginEmail && snap.val().registerPassword !== this.state.loginPassword) {
						alert("Please input the correct password.")
					} 
				})
			})
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
									<br /><button>Login</button>
								</form>
							</div>
							<div id="register">
								<p>Don't have an account? Register now!</p>
								<form onSubmit={this.handleRegisterSubmit} autocomplete="off" id="registerSubmit">
									<input onChange={this.handleChange} value={this.state.registerEmail} name="registerEmail" type="text" placeholder="Email Address" />
									<input onChange={this.handleChange} value={this.state.registerPassword} name="registerPassword" type="text" placeholder="8 Character Password" />
									<br /><button>Register</button>
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