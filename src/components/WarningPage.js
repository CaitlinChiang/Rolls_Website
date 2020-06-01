import React, { Component } from 'react'


class Warning extends Component {
    state = { }

    render() {
        return (
            <section id="warning">
                <div class="conatiner warning">
                    <h1>To see your shopping cart, kindly login to your account!<br />Simply click "Order" to see the login / signup form.</h1>
                </div>
            </section>
        )
    }
}

export default Warning