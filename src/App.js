import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import MoviePicker from './components/MoviePicker';

class App extends Component {
  render() {
    return (
      <div class="container">
        <Header />
        <div className="pickerContainer">
          <MoviePicker />
          <MoviePicker />
        </div>
      </div>
    );
  }
}

export default App;
