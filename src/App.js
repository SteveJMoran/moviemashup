import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import MoviePicker from './components/MoviePicker';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="pickerContainer">
          <MoviePicker
          id={1}
           />
          <MoviePicker
          id={2} 
          />
        </div>
      </div>
    );
  }
}

export default App;
