import React, { Component } from 'react';
// /import config from '../constants';

import MovieSelect from './MovieSelect';

class MovieForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedMovieA: null,
      selectedMovieB: null
    }
  }
  setMovieChoice(){
    
  }
  render(){
    return(
      <form>
        <div className="container">
          <MovieSelect
          id={1}
          setMovieChoice={ this.setMovieChoice }
           />
          <MovieSelect
          id={2} 
          setMovieChoice={ this.setMovieChoice }
          />
        </div>
        <div className="container">
          <button type="submit">Mashup!</button>
        </div>
      </form>
    )
  }
}

export default MovieForm;