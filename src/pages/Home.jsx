import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <p
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
  }
}

export default Home;
