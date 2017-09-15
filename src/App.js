import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import _ from 'lodash';

class App extends Component {
  componentDidMount() {
    const self = this;

    fetchBTCData();

    function fetchBTCData() {
      fetch('http://localhost:8081')
        .then(function (res) {
          res.json().then(({ model }) => {
            self.setState({ model })
          })
        }).catch(function (err) {
          console.log('fetch error ', err);
        });
    }
    setInterval(fetchBTCData, 3000);
  }

  render() {
    return !_.get(this.state, 'model') ?
      (<div>Loading...</div>) : (
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
