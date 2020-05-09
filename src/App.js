import React, { Component } from 'react'

import Navbar from './pages/01-Navbar'
import Home from './pages/02-Home'
import Products from './pages/03-Products'
import Articles from './pages/04-Articles'


class App extends Component {
    state = {
        DisplayHome: true,
        DisplayProducts: false,
        DisplayArticles: false
    }

    goHome = () => {
        this.setState({
            DisplayHome: true,
            DisplayProducts: false,
            DisplayArticles: false
        })
    }

    goProducts = () => {
        this.setState({
            DisplayHome: false,
            DisplayProducts: true,
            DisplayArticles: false
        })
    }

    goArticles = () => {
        this.setState({
            DisplayHome: false,
            DisplayProducts: false,
            DisplayArticles: true
        })
    }

    render() {
        return (
            <div>
                <Navbar goHome={this.goHome} goProducts={this.goProducts} goArticles={this.goArticles} />
                {this.state.DisplayHome ? <Home /> : null}
                {this.state.DisplayProducts ? <Products /> : null}
                {this.state.DisplayArticles ? <Articles /> : null}
            </div>
        )
    }
}

export default App