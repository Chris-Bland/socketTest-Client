import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import _ from 'lodash';
import io from 'socket.io-client';

class App extends Component {
  componentDidMount() {
    const socket = io.connect('https://cpa-server.herokuapp.com/');
    const self = this;
    fetch('https://cpa-server.herokuapp.com/')
    .then(function(res) {
      res.json().then(({ model }) => {
        self.setState({ model })
      })
    }).catch(function(err) {
      console.log('fetch error ', err);
    });

    var audio = new Audio('/alert.mp3');
  
    socket.on('alert', function (data) {
      audio.play();
      window.alert("CONDITION MET");
    })

    socket.on('bitcoinUpdate', function (data) {
      self.setState({ model: data })
    })
  }

  render() {
    return !_.get(this.state, 'model') ? 
      (<div>Loading...</div>) :(
      <div className="App">
        <div className="App-header">
          <img src='/bitcoin.png' className="App-logo" alt="logo" />
          <h2>Bitcoin Price Analizer</h2>
        </div>
        <Home model={this.state.model} />
      </div>
    );
  }
}

export default App;
