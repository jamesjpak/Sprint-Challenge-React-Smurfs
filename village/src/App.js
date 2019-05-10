import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

import axios from "axios";

import { Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  addSmurf = newSmurf => {
    axios
      .post("http://localhost:3333/smurfs", newSmurf)
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className='background'>
        <nav className="nav-bar">
          <NavLink to="/">
            {" "}
            <div className="nav-link-style"> Home </div>{" "}
          </NavLink>
          <NavLink to="/smurf-form">
            {" "}
            <div className="nav-link-style">Add a Smurf! </div>{" "}
          </NavLink>
        </nav>
        <div className="App">
          <Route
            path="/"
            render={props => <Smurfs smurfs={this.state.smurfs} {...props} />}
          />

          <Route
            path="/smurf-form"
            render={props => (
              <SmurfForm
                smurfs={this.state.smurfs}
                addSmurf={this.addSmurf}
                {...props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
