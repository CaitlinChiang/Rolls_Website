import React, { Component } from 'react'


class DateInput extends Component {
    state = { readOnly: false }

    render() {
        return (
            <input
                {...this.props}
                onFocus={() => this.setState({ readOnly: true })}
                onBlur={() => this.setState({ readOnly: false })}
                readOnly={ this.state.readOnly }
            />
        )
    }
}

export default DateInput