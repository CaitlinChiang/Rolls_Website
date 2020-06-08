import React, { Component } from 'react'
import * as firebase from 'firebase'
import '../services/firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


class Account extends Component {
	state = {
		userEmail: '',
		userPassword: ''
	}

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccess: () => false		
		}
	}

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({ [name]: value })
	}

	//email and password sign up
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
		firebase.auth().sendPasswordResetEmail(this.state.userEmail)
		.then((user) => { alert("Please check your email!") })
	}

	render() {
		return (
			<div>
				<section id="profile">
					<div class="container">
						<div class="signin">
							<input onChange={this.handleChange} value={this.state.userEmail.trim()} name="userEmail" type="text" placeholder="Email" autocomplete="off" />
							<input onChange={this.handleChange} value={this.state.userPassword.trim()} name="userPassword" type="text" placeholder="Password" autocomplete="off" />
							<br /><button onClick={this.singup}>Register</button>
							<button onClick={this.signin}>Login</button>
							<button onClick={this.reset} id="forgot">Forgot Password?</button>
						</div>	
						<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
					</div>
				</section>
			</div>
		)
	}
}

export default Account