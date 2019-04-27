import React, { Component } from 'react';
import config from '../constants';

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
      RecommendedMovie: null
    }

    this.setMovieChoiceA = this.setMovieChoiceA.bind(this)
    this.setMovieChoiceB = this.setMovieChoiceB.bind(this)
    this.setRecommendationsA = this.setRecommendationsA.bind(this)
    this.setRecommendationsB = this.setRecommendationsB.bind(this)
  }
  componentDidUpdate(){
    if(this.state.recommendationsA.length && this.state.recommendationsB.length && this.state.RecommendedMovie === null){
      this.recommend();
    }
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
  setRecommendationsA(recommendations){
    this.setState({
      recommendationsA: recommendations
    })
  }
  setRecommendationsB(recommendations){
    this.setState({
      recommendationsB: recommendations
    })
  }
  loadingRecommendation(){
    return(
      <div className="loading-recommendation">Loading</div>
    )
  }
  getSharedReccomendations(a,b){
    const matches = [];
    a.forEach((e1) => b.forEach((e2) => {
      if( JSON.stringify(e1) === JSON.stringify(e2)) {
        matches.push(e1);
      }
    }))

    if(!matches.length){
      // if they have no matches 
      matches.push(a[0])
      matches.push(b[0])
    }
    return matches
  }
  _reset = event => {
    event.preventDefault();
    this.setState({
      selectedMovieA: null,
      selectedMovieB: null,
      recommendationsA: [],
      recommendationsB: [],
      RecommendedMovie: null
    })
    const headerPanel = document.querySelector("header");
    headerPanel.scrollIntoView();
  }
  recommend() {
    console.log("analyzing..")

    const { recommendationsA, recommendationsB} = this.state;
    const matches = this.getSharedReccomendations(recommendationsA, recommendationsB)

    this.setState({
      RecommendedMovie: matches[0]
    })
  }
  renderRecommendation(){
    const recommendationPanel = document.getElementById("recommendation");
    recommendationPanel.scrollIntoView();

    const movie = this.state.RecommendedMovie;
    const posterUrl = config.getPosterUrl(movie.poster_path)

    return (
      <div className="result">
        <h3>You should watch:</h3>
        <img src={ posterUrl } alt={movie.title}/>
        <h2>{movie.title}</h2>
        <p>{ movie.overview }</p>
      </div>
    )
  }
  render(){
    return(
      <form>
        <div className="panel">
          <Header 
          containerClass={"container"}/>
        </div>
        <div className="panel panel-half" id="selectOne">
          <MovieSelect
          id={1}
          placeholder={"Pick a Movie"}
          setMovieChoice={ this.setMovieChoiceA }
          setRecommendations={ this.setRecommendationsA }
          selectedMovie={ this.state.selectedMovieA }
          containerClass={"moviePicker container container-red"}
          />
        </div>
        <div className="panel panel-half">
          <MovieSelect
          id={2} 
          placeholder={"Pick another Movie"}
          setMovieChoice={ this.setMovieChoiceB }
          setRecommendations={ this.setRecommendationsB }
          selectedMovie={ this.state.selectedMovieB }
          containerClass={"moviePicker container container-cyan"}
          />
        </div>
        <div className="panel" id="recommendation">
          <div className="container">
            { this.state.RecommendedMovie !== null ? this.renderRecommendation(): this.loadingRecommendation() }
            <div className="reset-container">
              <button type="button" class="reset-button" onClick={ (event) => { this._reset(event)} }>Reset</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default MovieForm;