import React, { Component } from 'react'

import Navbar from './pages/01-Navbar'
import DisplayHome from './pages/02-Home'


class App extends Component {
    state = {}

    render() {
        return (
            <div>
                <Navbar />
                <DisplayHome />
            </div>
        )
    }
}

export default App