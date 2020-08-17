import React from 'react';
import './App.css';

import Information from './Information';
import Salarymeter from './Salarymeter';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      info: [0, 0, '0000', '0000', '0000', '0100'],
    };
  }

  getInfo = (sal, cpf, sw, ew, sb, eb) => {
    this.setState({
      info: [sal, cpf, sw, ew, sb, eb],
    });
  };

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <Information handleSubmit={this.getInfo}></Information>
        <Salarymeter info={this.state.info} />
      </div>
    );
  }
}

export default App;
