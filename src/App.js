/// on github: https://stevejmoran.github.io/moviemashup

import React, { Component } from 'react';

import './App.scss';

import MovieForm from './components/MovieForm';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <MovieForm />
        <Footer />
      </div>
    );
  }
}

export default App;
