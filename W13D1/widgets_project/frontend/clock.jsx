import React from 'react';

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = { time: new Date() };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let seconds = this.state.time.getSeconds();
    let minutes = this.state.time.getMinutes();
    let hours = this.state.time.getHours();
    let month = this.state.time.getMonth();
    let day = this.state.time.getDate();
    let year = this.state.time.getFullYear();
    return <div className="main-clock">
      <h1>Our Clock</h1>
      <div className="time">
        <p>Time: </p>
        <p className="clock">{ hours % 12}:{ minutes }:{ seconds }</p>
      </div>

      <div className="date">
        <p>Date: </p>
        <p className="clock">{month + 1}/{day}/{year}</p>
      </div>
    </div>
  }

  tick() {
    this.setState({time: new Date()});
  }

}

export default Clock;