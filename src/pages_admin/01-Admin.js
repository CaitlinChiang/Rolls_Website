import React, { Component } from 'react'
import * as firebase from 'firebase'
import ControlsNavbar from './02-ControlsNav'
import View from './03-Viewing'
import Controls from './04-Control'


class Admin extends Component {
    state = {
        DisplayView: true, DisplayControls: false
    }

    goOrders = () => this.setState({ DisplayView: true, DisplayControls: false })
    goControls = () => this.setState({ DisplayView: false, DisplayControls: true })

    render() {
        return (
            <div>
                <ControlsNavbar goOrders={this.goOrders} goControls={this.goControls} />
                {this.state.DisplayView ? <View /> : null}
                {this.state.DisplayControls ? <Controls /> : null}
            </div>
        )
    }
}

export default Admin