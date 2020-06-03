import React, { Component } from 'react'
import * as firebase from 'firebase'
import Account from './components/LoginForm'
import Cart from './components/Cart'
import Warning from './components/WarningPage'
import Navbar from './pages/01-Navbar'
import Home from './pages/02-Home'
import Products from './pages/03-Products'
import Articles from './pages/04-Articles'
import Controls from './pages/05-Controls'
import AuthorizedControls from './components/SelectedControls'


class App extends Component {
    state = {
        user: {},
        userID: '',
        
        DisplayCart: false, DisplayHome: true,  DisplayProducts: false, DisplayArticles: false
    }

    componentDidMount = async () => this.authListener()

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            {user ? this.setState({ user, userID: user.uid }) : this.setState({ user: null })}
        })
    }

    goCart = () => this.setState({ DisplayCart: true, DisplayHome: false, DisplayProducts: false, DisplayArticles: false })

    goHome = () => this.setState({ DisplayCart: false, DisplayHome: true, DisplayProducts: false, DisplayArticles: false })

    goProducts = () => this.setState({ DisplayCart: false, DisplayHome: false, DisplayProducts: true, DisplayArticles: false })

    goArticles = () => this.setState({ DisplayCart: false, DisplayHome: false, DisplayProducts: false, DisplayArticles: true })

    render() {
        return (
             <div>
                {this.state.userID !== 'alnLJ1AokzOcSVTt1yN3ereBayr2' && this.state.userID !== 'JXw3ACHGrvQtUV50SrdCnVBkutG3' && this.state.userID !== 'gff7aamicCS7pFx6pEPlw7TY2RP2' ?
                    <div>
                        <Navbar goHome={this.goHome} goProducts={this.goProducts} goArticles={this.goArticles} goCart={this.goCart} />
                        {this.state.DisplayHome ? <Home goProducts={this.goProducts} /> : null}
                        {this.state.DisplayProducts ? <div>{this.state.user ? <Products consumer={this.state.userID} p1Stock={this.state.p1Stock} p2Stock={this.state.p2Stock} /> : <Account />}</div> : null}
                        {this.state.DisplayArticles ? <Articles /> : null}
                        {this.state.DisplayCart ? <div>{this.state.user ? <Cart consumer={this.state.userID} /> : <Warning />}</div> : null}
                    </div>
                : 
                <div>
                    {this.state.userID === 'alnLJ1AokzOcSVTt1yN3ereBayr2' || this.state.userID == 'JXw3ACHGrvQtUV50SrdCnVBkutG3' ? <Controls /> : <AuthorizedControls />}
                </div>}
            </div>
        )
    }
}

export default App