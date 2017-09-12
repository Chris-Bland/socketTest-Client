import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import io from 'socket.io-client';
import numeral from 'numeral';

class Home extends Component {
  constructor(props) {
    super(props);

    this.startSocket = this.startSocket.bind(this)
  }

  startSocket() {
    const self = this;
    const socket = io.connect('http://192.168.7.130:8080');
    socket.emit('bitcoin', {
      btcPercent: self.refs.btcPercent.getValue(),
      btcTime: self.refs.btcTime.getValue(),
    })
  }

  render() {

    const { btcColor, btcPercentChange, btcAverage, btcTotalTime, btcTicker: { price } } = this.props.model
    console.log('btcPercentChange: ', btcPercentChange);

    return (
      <div>
        <div>
          <h1>Bitcoin</h1>
          <h2 id="btcLastTraded">Last Traded Price: {numeral(price).format('$0,0.00')} </h2>
          <h2 id="btcMovementPeriod">Movement Period Watched: {btcTotalTime} minutes</h2>
          <h2 id="btcAverage">Average Moving Price: {numeral(btcAverage).format('$0,0.00')}</h2>
          <h2 id="btcMovementPercentage" style={{ color: `${btcColor}`}}> Bitcoin has moved {numeral(btcPercentChange).format('0.00%')}</h2>
        </div>
        <h3>Alert when Bitcoin has moved: </h3>
        <TextField
          ref='btcPercent'
          hintText="Percent Changed"
          floatingLabelText="Percent Changed"
        /><br />
        <h3> in: </h3>
        <TextField
          ref='btcTime'
          hintText="Period in Minutes"
          floatingLabelText="Period in Minutes"
        />
        <br />
        <br />
        <RaisedButton
          onClick={this.startSocket}
          label="Set" />
      </div>
    );
  }
}

export default Home;
