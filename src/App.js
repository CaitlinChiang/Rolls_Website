import React, { Component } from 'react' 
import Navbar from './pages/01-Navbar'
import Home from './pages/02-Home'
import Products from './pages/03-Products'
import Articles from './pages/04-Articles'
import Profile from './pages/05-Profile'
import Controls from './pages/06-Controls'


class App extends Component {
    state = {
        consumer: 'Caitlin',

        DisplayProfile: true,
        DisplayHome: false,
        DisplayProducts: false,
        DisplayArticles: false
    }

    setUser = (userData) => this.setState({ consumer: userData })

    goProfile = () => {
        this.setState({
            DisplayProfile: true,
            DisplayHome: false,
            DisplayProducts: false,
            DisplayArticles: false
        })
    }

    goHome = () => {
        this.setState({
            DisplayProfile: false,
            DisplayHome: true,
            DisplayProducts: false,
            DisplayArticles: false
        })
    }

    goProducts = () => {
        this.setState({
            DisplayProfile: false,
            DisplayHome: false,
            DisplayProducts: true,
            DisplayArticles: false
        })
    }

    goArticles = () => {
        this.setState({
            DisplayProfile: false,
            DisplayHome: false,
            DisplayProducts: false,
            DisplayArticles: true
        })
    }

    render() {
        return (
            <div>
                {this.state.consumer !== 'Raffy' ? 
                <div>
                    <Navbar goHome={this.goHome} goProducts={this.goProducts} goArticles={this.goArticles} goProfile={this.goProfile} />
                    {this.state.DisplayHome ? <Home /> : null}
                    {this.state.DisplayProducts ? <Products consumer={this.state.consumer} p1Stock={this.state.p1Stock} p2Stock={this.state.p2Stock} /> : null }
                    {this.state.DisplayArticles ? <Articles /> : null}
                    {this.state.DisplayProfile ? <Profile data={{ consumer: this.state.consumer, setUser: this.setUser.bind(this) }} consumer={this.state.consumer} /> : null }
                </div>
                : <Controls />}
            </div>
        )
    }
}

export default App