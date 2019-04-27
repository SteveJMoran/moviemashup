import React, { Component } from 'react';

class Header extends Component {
  render() {
    return(
    <header className={this.props.containerClass }>
      <h1>Movie Mashup</h1>
      <p>Pick two movies and Movie Mashup will recomend a movie based on your selections!</p>
      <a className="start-button" href="#selectOne" onClick={ this.props.scrollToRef }>Start</a>
    </header>
    )
  }
}

export default Header;