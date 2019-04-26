import React, { Component } from 'react';
// /import config from '../constants';

import MovieSelect from './MovieSelect';

class MovieForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedMovieA: null,
      selectedMovieB: null,
      recommendationsA: [],
      recommendationsB: [],
    }

    this.setMovieChoiceA = this.setMovieChoiceA.bind(this)
    this.setMovieChoiceB = this.setMovieChoiceB.bind(this)
    this.setRecommendationsA = this.setRecommendationsA.bind(this)
    this.setRecommendationsB = this.setRecommendationsB.bind(this)
  }
  setMovieChoiceA(movie){
    this.setState({
      selectedMovieA: movie
    })
  }
  setMovieChoiceB(movie){
    this.setState({
      selectedMovieB: movie
    })
  }
  setRecommendationsA(movie){
    this.setState({
      recommendationsA: movie
    })
  }
  setRecommendationsB(movie){
    this.setState({
      recommendationsB: movie
    })
  }
  loadingRecomendation(){
    return(
      <div>Loading...</div>
    )
  }
  getSharedGenres(a,b){

    let sharedGenres = [];
    a.map(genre => {
      const genreId = genre.id;
      b.map(match => {
        if(genreId === match.id){
          sharedGenres.push(match);
        }
      })
    })
    return sharedGenres;
  }
  analyze(){
    console.log("analyzing..")
    const { selectedMovieA:movieA , selectedMovieB:movieB } = this.state;

    const genres = this.getSharedGenres(movieA.genres, movieB.genres)

    console.log(genres)
    console.log(movieA, movieB);
  }
  renderRecomendation(){
    this.analyze();
  }
  render(){
    return(
      <form>
        <div className="container">
          <MovieSelect
          id={1}
          setMovieChoice={ this.setMovieChoiceA }
           />
        </div>
        <div className="container">

          <MovieSelect
          id={2} 
          setMovieChoice={ this.setMovieChoiceB }
          />
        </div>
        <div className="container">
          { (this.state.selectedMovieA !== null && this.state.selectedMovieB !== null )? this.renderRecomendation(): this.loadingRecomendation() }
        </div>
      </form>
    )
  }
}

export default MovieForm;