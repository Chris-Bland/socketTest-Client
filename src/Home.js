import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import numeral from 'numeral';

class Home extends Component {
  constructor(props) {
    super(props);
    this.calculateBTC = this.calculateBTC.bind(this);
    this.checkConditionMet = this.checkConditionMet.bind(this);
    this.parseBTCData = this.parseBTCData.bind(this);
    this.calculateBTCChange = this.calculateBTCChange.bind(this);
  }

  calculateBTC() {
    const self = this;
    self.props.model.btcTotalTime = self.refs.btcTime.getValue();
    self.props.model.btcPercent = self.refs.btcPercent.getValue();
    self.setState({ btcTotalTime: self.refs.btcTime.getValue() })
    self.setState({ btcPercent: self.refs.btcPercent.getValue() })
    this.checkConditionMet();
  }

  checkConditionMet() {
    const self = this;
    if (self.props.model.btcPercentChange >= self.props.model.btcPercent) {
      var audio = new Audio('/alert.mp3');
      audio.play();
      let conditionMet = true;
      if (conditionMet === true) {
        window.alert("CONDITION MET");
      }
    }
  }

  parseBTCData() {
    const self = this;
    let total = 0;
    for (var i = 0; i < (inputTime * 2); i++) {
      total += (btcHistoric[i][1] + btcHistoric[i][2]) / 2;
    }

    let btcAverage = total / (inputTime * 2);
    let firstCandle = btcHistoric[(inputTime * 2) - 1];
    let openPrice = (firstCandle[1] + firstCandle[2]) / 2;

    var btcPercentChange = ((btcTicker.price - openPrice) / btcTicker.price);

    if (btcPercentChange < 0) {
      btcColor = "red"
    } else {
      btcColor = "green"
    };
  }
}

render() {
  // var { btcColor, btcPercentChange, btcAverage, btcTotalTime, btcTicker: { price } } = this.props.model
  console.log('THIS.PROPS.MODEL: ', this.props.model);
  return (
    <div>
      <div>
        <h1>Bitcoin</h1>
        <h2 id="btcLastTraded">Last Traded Price: {numeral(price).format('$0,0.00')} </h2>
        <h2 id="btcMovementPeriod">Movement Period Watched: {btcTotalTime} minutes</h2>
        <h2 id="btcAverage">Average Moving Price: {numeral(btcAverage).format('$0,0.00')}</h2>
        <h2 id="btcMovementPercentage" style={{ color: `${btcColor}` }}> Bitcoin has moved {numeral(btcPercentChange).format('0.00%')}</h2>
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
        onClick={this.calculateBTC}
        label="Set" />
    </div>
  );
}
}

export default Home;
