import React, { Component } from 'react'
import * as firebase from 'firebase'
import '../services/firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


class Account extends Component {
	state = {
		userEmail: '',
		userPassword: '',

		user: ''
	}

	//proceed without registering an account
	proceedWithoutAccount = (event) => {
		event.preventDefault()

		const confirmation = window.confirm("Ordering without an account means that you wouldn't have full access to the website's features, which includes order tracking and data being saved even when the window is closed. Proceed?")
		if (confirmation) {
			var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz'

			var userResult = ''
			for ( var i = 0; i < 20; i++ ) {
			  userResult += characters.charAt(Math.floor(Math.random() * characters.length))
			}

			this.setState({ user: userResult })
		}

		this.props.proceedWithoutAccount(userResult)
	}

	//email and password sign up
	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	singup = (event) => {
		event.preventDefault()

		firebase.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword).then((u) => {
		}).catch((error) => { alert(error) })

		firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
	}

	signin = (event) => {
		event.preventDefault()

		firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword).then((u) => {
		}).catch((error) => { alert(error) })
	}

	reset = (event) => {
		event.preventDefault()

		if (this.state.userEmail.trim() === '') {
			alert("Kindly input your email in the email textholder.")
		}
		else {
			firebase.auth().sendPasswordResetEmail(this.state.userEmail)
			.then((user) => { alert("Please check your email!") })
		}
	}

	generateUsernamePassword = (event) => {
		event.preventDefault()

		const confirmation = window.confirm("Would you allow Rolls to create a custom email and password for you?")
		if (confirmation) {
			var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789'

			var usernmameResult = ''
			for ( var i = 0; i < 8; i++ ) {
			  usernmameResult += characters.charAt(Math.floor(Math.random() * characters.length))
			}
			usernmameResult += '@gmail.com'

			var passwordResult = ''
			for ( var i = 0; i < 7; i++ ) {
			  passwordResult += characters.charAt(Math.floor(Math.random() * characters.length))
			}

			this.setState({ userEmail: usernmameResult, userPassword: passwordResult })
		}
	}

	//sign in with Google
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccess: () => false		
		}
	}

	render() {
		return (
			<div>
				<section id="profile">
					<div class="container">
						<div class="signin">

							<div class="note">
								<p>***For same day orders, please text us at 09174707111, or message us through our <a href="https://www.facebook.com/officialrolls.ph/">Facebook Page</a> or through <a href="https://www.instagram.com/rolls.ph/">Instagram</a>.***</p>
							</div>

							<div class="noAccount">
								<button onClick={this.proceedWithoutAccount}>Order Without Registering?</button>
							</div>

							<div class="login">
								<input onChange={this.handleChange} value={this.state.userEmail.trim()} name="userEmail" type="text" placeholder="Email" autocomplete="off" />
								<input onChange={this.handleChange} value={this.state.userPassword.trim()} name="userPassword" type="text" placeholder="Password" autocomplete="off" />
								<br /><button onClick={this.singup}>Register</button>
								<button onClick={this.signin}>Login</button>
							</div>

							<div class="trouble">
								<button onClick={this.reset}>Forgot Password?</button>
								<button onClick={this.generateUsernamePassword}>Trouble Registering?</button>
							</div>

						</div>
						<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />	
					</div>
				</section>
			</div>
		)
	}
}

export default Account