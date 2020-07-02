import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "Atlanta",
            state: "GA",
            country: "US",
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(e, this.state);
    }
    render() {
        return (
            <Dropdown>
            <div style={{ display: 'flex', justifyContent: 'center', visibility: this.props.visible }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'rgba(162, 241, 255, .7)', border: 'none', height: '5vh', fontSize: '2vh'}}>
                        Location Entry
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width: "50vw"}}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <FormControl
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    name="city"
                                    placeholder="City"
                                    aria-label="City"
                                    aria-describedby="basic-addon1"
                                />
                            </Form.Group>
                            <Form.Group>
                                <FormControl
                                    value={this.state.state}
                                    onChange={this.handleChange}
                                    name="state"
                                    placeholder="State"
                                    aria-label="State"
                                    aria-describedby="basic-addon1"
                                />
                            </Form.Group>
                            <Form.Group>
                                <FormControl
                                    value={this.state.country}
                                    onChange={this.handleChange}
                                    name="country"
                                    placeholder="Country"
                                    aria-label="Country"
                                    aria-describedby="basic-addon1"
                                />
                            <Button style={{marginTop: '10px'}}type="submit">Submit</Button>
                            </Form.Group>
                        </Form>
                    </Dropdown.Menu>
            </div>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather,
        background: state.background
    }
}

export default connect(
    mapStateToProps,
    null
)(Weather);