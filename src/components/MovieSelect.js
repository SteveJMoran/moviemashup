import React, { Component } from 'react';
import axios from 'axios';
import { throttle, debounce } from 'throttle-debounce';
import config from '../constants';


class MovieSelect extends Component {
  constructor(props) {
    super(props);

    this.autoCompleteid = "autocomplete-"+props.id

    this.autocompleteSearchDebounced = debounce(300, this.autocompleteSearch);
    this.autocompleteSearchThrottled = throttle(300, this.autocompleteSearch);

    this.state = { 
      q: '',
      _searches:null,
      results:[],
    };
    this.fetchSelectedMovie = this.fetchSelectedMovie.bind(this);
  }
  changeQuery = event => {
    this.handleSelect(event)
    this.setState(
      { q: event.target.value },
      () => {
        const q = this.state.q;
        if(q.length < 5) {
          this.autocompleteSearchThrottled(this.state.q);
        } else {
          this.autocompleteSearchDebounced(this.state.q);
        }
      }
    )
  }
  handleSelect = event => {
    const input = event.target
    const inputValue = input.value;
    const list = input.getAttribute('list')
    let options = document.querySelectorAll('#' + list + ' option')
    options = [...options]
    let selectedId = null;
    let matchedOption = null;

    selectedId = options.filter(option => {
      if(option.value === inputValue){
        matchedOption = option
      }
      return matchedOption
    })
    if(selectedId.length){
      const movieId = selectedId[0].dataset.value
      
      this.fetchSelectedMovie(movieId)
      this.fetchRecommendations(movieId)
    }
  }
  autocompleteSearch = q => {
    this.fetchMatches(q);
  }
  fetchMatches = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({_searches});

    this.fetchMovies(q);
  }
  async fetchMovies (q) {
    try {
      const qUrl = `${config.API_URL}/search/movie`;
      const qParams = {
        crossDomain: true,
        api_key: config.API_TOKEN,
        query: q,
        page: 1,
        include_adult: false
      }
      if(q.length){
        const movieData = await axios.get(qUrl, {params: qParams})
        const { results: movies } = movieData.data;

        this.setState({results: movies})
      }
    } catch(e) {
      console.error(e.message)
    }
  }
  async fetchSelectedMovie(id){
    try {
      const url = `${config.API_URL}/movie/${id}`;
      const params = {
        crossDomain: true,
        api_key: config.API_TOKEN,
        include_adult: false
      }

      const movieData = await axios.get(url, {params: params})
      const { data:selected } = movieData;
      this.props.setMovieChoice(selected)

    } catch(e) {
      console.error(e.message)
    }
  }
  async fetchRecommendations(id, page) {
    try {
      const url = `${config.API_URL}/movie/${id}/recommendations`;
      page = page !== null ? page : 1;
      const params = {
        crossDomain: true,
        api_key: config.API_TOKEN,
        page: 1,
        include_adult: false
      }
      const params2 = {
        crossDomain: true,
        api_key: config.API_TOKEN,
        page: 2,
        include_adult: false
      }
      // get the first two pages of recommendations
      // TODO Find a better way to get both
      const recommendationData = await axios.get(url, {params: params})
      const recommendationData2 = await axios.get(url, {params: params2})
      const { results:recommendations1 } = recommendationData.data;
      const { results:recommendations2 } = recommendationData2.data;
      const recommendations = [...recommendations1,...recommendations2];

      this.props.setRecommendations(recommendations)
  
    } catch(e) {
      console.error(e.message)
    }
  }
  renderBlank(){
    return ({'backgroundImage':'none'})
  }
  renderBackground(){
    const { backdrop_path } = this.props.selectedMovie;
    const backgroundImage = config.getBackdropUrl(backdrop_path);
    return ( {'backgroundImage': `url(${backgroundImage})`} )
  }
  renderSearchResults() {
    const { results } = this.state;
    const resultsHtml = results.map(result => {
      const {
        id,
        title,
        release_date: date
      } = result;
      const year = parseInt(date);

      return (
        <option key={id} data-value={id} value={`${title} (${year})`} /> 
      )
    })
    return resultsHtml;
  }
  render() {
    return (
      <div className={this.props.containerClass }>
        <div className="background" style={ this.props.selectedMovie !== null ? this.renderBackground() : this.renderBlank() }></div>
        <input
          placeholder={ this.props.placeholder }
          type="text"
          list={this.autoCompleteid }
          onChange={ this.changeQuery }
          value={ this.state.q }
        /> 
        <datalist className="movieAutocomplete" id={ this.autoCompleteid }>
        { this.renderSearchResults() }
        </datalist> 
      </div>
    )
  }
}

export default MovieSelect;