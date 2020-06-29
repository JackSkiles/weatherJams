import React, { Component } from 'react'

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
        }
    }

    onChange = (e) => {
        this.setState({city: e.target.value});
    }

    weatherGet = (e) => {
        e.preventDefault();
        console.log(this.state.city)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.weatherGet}>
                    <input type="text" defaultValue="Enter your city" onChange={this.onChange}></input>
                    <button type="onSubmit">Submit</button>
                </form>
            </div>
        )
    }
}
