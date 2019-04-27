import React, { Component } from 'react';
// /import config from '../constants';


import Header from './Header';
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
  loadingRecommendation(){
    return(
      <div className="loading-recommendation">Loading</div>
    )
  }
  // getSharedGenres(a,b){

  //   let sharedGenres = [];
  //   a.map(genre => {
  //     const genreId = genre.id;
  //     b.map(match => {
  //       if(genreId === match.id){
  //         sharedGenres.push(match);
  //       }
  //     })
  //   })
  //   return sharedGenres;
  // }
  // analyze(){
  //   console.log("analyzing..")
  //   const { selectedMovieA:movieA , selectedMovieB:movieB } = this.state;

  //   const genres = this.getSharedGenres(movieA.genres, movieB.genres)

  //   console.log(genres)
  //   console.log(movieA, movieB);
  // }
  // renderRecommendation(){
  //   this.analyze();
  // }
  render(){
    return(
      <form>
        <div className="panel">
          <Header containerClass={"container"} />
        </div>
        <div className="panel panel-half">
          <MovieSelect
          id={1}
          setMovieChoice={ this.setMovieChoiceA }
          containerClass={"moviePicker container container-red"}
          />
        </div>
        <div className="panel panel-half">
          <MovieSelect
          id={2} 
          setMovieChoice={ this.setMovieChoiceB }
          containerClass={"moviePicker container container-cyan"}
          />
        </div>
        <div className="panel">
          <div className="container">
            { (this.state.selectedMovieA !== null && this.state.selectedMovieB !== null )? this.renderRecommendation(): this.loadingRecommendation() }
          </div>
        </div>
      </form>
    )
  }
}

export default MovieForm;