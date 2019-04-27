import React, { Component } from 'react';

class Header extends Component {
  render() {
    return(
    <header className={this.props.containerClass }>
      <h1>Movie Mashup</h1>
      <p>Pick two movies and Movie Mashup will recomend a movie based on your selections!</p>
      <button className="start-button" href={"#"}>Start</button>
    </header>
    )
  }
}

export default Header;