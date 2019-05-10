import React, { Component } from 'react';

import Smurf from './Smurf';

import './Smurfs.css';



class Smurfs extends Component {
constructor(props) {
  super(props);
  this.state = {
    smurfs: props.smurfs
  }
}


  render() {
    
    return (
      <div className="Smurfs" >

      <img src={require("../img/smurfvillage.png")} />

      <div>
        <ul>
          {this.props.smurfs.map(smurf => (
              <Smurf
                smurf={smurf}
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                key={smurf.id}
              />
          ))}

        </ul>
      </div>
      </div>
    );
  }
}

Smurf.defaultProps = {
 smurfs: [],
};

export default Smurfs;
