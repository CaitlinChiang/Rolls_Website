import React, { Component } from 'react'
import * as firebase from 'firebase'

import Account from './components/LoginForm'
import Cart from './components/Cart'
import NoAccount from './components/NoAccount'
import Navbar from './pages/01-Navbar'
import Home from './pages/02-Home'
import Products from './pages/03-Products'
import Articles from './pages/04-Articles'

import Admin from './pages_admin/01-Admin'
import AuthorizedControls from './pages_admin/05-SelectedControls'


class App extends Component {
    state = {
        user: {},
        userID: '',
        
        DisplayCart: false, DisplayHome: true,  DisplayProducts: false, DisplayArticles: false
    }

    componentDidMount = async () => {
        this.authListener()
    }

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            {user ? this.setState({ user, userID: user.uid }) : this.setState({ user: null })}
        })
    }

    receiveUserFromChild = (userID) => this.setState({ userID })

    goCart     = () => this.setState({ DisplayCart: true, DisplayHome: false, DisplayProducts: false, DisplayArticles: false })
    goHome     = () => this.setState({ DisplayCart: false, DisplayHome: true, DisplayProducts: false, DisplayArticles: false })
    goProducts = () => this.setState({ DisplayCart: false, DisplayHome: false, DisplayProducts: true, DisplayArticles: false })
    goArticles = () => this.setState({ DisplayCart: false, DisplayHome: false, DisplayProducts: false, DisplayArticles: true })

    render() {
        return (
             <div>
                {this.state.userID !== 'alnLJ1AokzOcSVTt1yN3ereBayr2' && this.state.userID !== 'JXw3ACHGrvQtUV50SrdCnVBkutG3' && this.state.userID !== '2AL13xyATEZBP0nCqeL0p5SlxcN2' && this.state.userID !== 'gff7aamicCS7pFx6pEPlw7TY2RP2' ?
                    <div>
                        <Navbar goHome={this.goHome} goProducts={this.goProducts} goArticles={this.goArticles} goCart={this.goCart} consumer={this.state.userID} />
                        
                        {this.state.DisplayHome ? <Home goProducts={this.goProducts} /> : null}

                        {this.state.DisplayProducts ? 
                            <div>
                                {this.state.user || this.state.userID ? <Products consumer={this.state.userID} p1Stock={this.state.p1Stock} p2Stock={this.state.p2Stock} goCart={this.goCart} /> : <Account proceedWithoutAccount={this.receiveUserFromChild} />}
                            </div> 
                        : null}
                        
                        {this.state.DisplayArticles ? <Articles /> : null}

                        {this.state.DisplayCart ? 
                            <div>
                                {this.state.user || this.state.userID ? 
                                    <div>
                                        {this.state.userID.length !== 20 ? <Cart consumer={this.state.userID} /> : <NoAccount consumer={this.state.userID} />}
                                    </div> 
                                : <NoAccount />}
                            </div> 
                        : null}

                    </div>
                : 
                <div>
                    {this.state.userID === 'alnLJ1AokzOcSVTt1yN3ereBayr2' || this.state.userID == 'JXw3ACHGrvQtUV50SrdCnVBkutG3' ? <Admin /> : <AuthorizedControls />}
                </div>}
            </div>
        )
    }
}

export default App