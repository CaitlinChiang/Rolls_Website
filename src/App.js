import React, { Component } from 'react'

import Navbar from './pages/01-Navbar'
import Home from './pages/02-Home'
import Products from './pages/03-Products'


class App extends Component {
    state = {
        DisplayHome: true,
        DisplayProducts: false
    }

    goHome = () => {
        this.setState({
            DisplayHome: true,
            DisplayProducts: false
        })
    }

    goProducts = () => {
        this.setState({
            DisplayHome: false,
            DisplayProducts: true
        })
    }

    render() {
        return (
            <div>
                <Navbar goHome={this.goHome} goProducts={this.goProducts} />
                {this.state.DisplayHome ? <Home /> : null}
                {this.state.DisplayProducts ? <Products /> : null}
            </div>
        )
    }
}

export default App