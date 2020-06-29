import React, { Component } from 'react'
import axios from 'axios';

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
            state: "",
            country: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(e, this.state)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.city} name="city" onChange={this.handleChange}></input>
                    <input type="text" value={this.state.state} name="state" onChange={this.handleChange}></input>
                    <input type="text" value={this.state.country} name="country" onChange={this.handleChange}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
