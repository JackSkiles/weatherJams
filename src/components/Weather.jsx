import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { SongList } from "react-router-dom";

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "Atlanta",
            state: "GA",
            country: "US",
            songs: [],
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
                    <h3>City:</h3>
                    <input type="text" value={this.state.city} name="city" onChange={this.handleChange}></input>
                    <h3>State:</h3>
                    <input type="text" value={this.state.state} name="state" maxLength="2" onChange={this.handleChange}></input>
                    <h3>Country:</h3>
                    <input type="text" value={this.state.country} name="country" onChange={this.handleChange}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
