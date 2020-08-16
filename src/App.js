import React from 'react';
import './App.css';

import Information from './Information';
import Salarymeter from './Salarymeter';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      info: [],
    };
  }

  getInfo = (sal, cpf, sw, ew, sb, eb) => {
    this.setState({
      info: [sal, cpf, sw, ew, sb, eb],
    });
  };

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
