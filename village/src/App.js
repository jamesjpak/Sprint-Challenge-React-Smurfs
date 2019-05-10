import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

import axios from "axios";
import { throws } from "assert";

import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

addSmurf = newSmurf => {
  axios
  .post('http://localhost:3333/smurfs', newSmurf)
  .then(res => {
    this.setState({smurfs: res.data})
  })
  .catch(err => {
    console.log(err.response);
  })
}

  render() {
    console.log(this.state.smurfs);

    return (
      <div className="App">

      <nav>
      <NavLink to='/'> Home </NavLink>
      <NavLink to='/smurf-form'> Add a Smurf! </NavLink>
      </nav>

        <Route 
        exact path="/"
        render={props => ( <Smurfs smurfs={this.state.smurfs} {...props} /> )} 
        />

        <Route
        path="/smurf-form"
        render={props => ( <SmurfForm smurfs={this.state.smurfs} addSmurf={this.addSmurf} {...props} /> )}
        />
        
      </div>
    );
  }
}

export default App;
