import React, { Component } from 'react'

import Navbar from './pages/01-Navbar'
import Home from './pages/02-Home'


class App extends Component {
    state = {
        DisplayHome: true
    }

    goHome = () => {
        this.setState({
            DisplayHome: true
        })
    }

    render() {
        return (
            <div>
                <Navbar goHome={this.goHome} />
                {this.state.DisplayHome ? <Home /> : null}
            </div>
        )
    }
}

export default App