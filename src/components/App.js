import React, { Component } from 'react';

import './index.css';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return <div className="App">Recraft</div>;
  }
}

export default App;
