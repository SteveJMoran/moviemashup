import React, { Component } from 'react';
import { throttle, debounce } from 'throttle-debounce';
import { searchMovies, getMovie, recommend, getBackdropUrl } from './MovieApi.js'

export default class MovieSelect extends Component {
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
      
      getMovie(movieId)
        .then(a => {
          this.props.setMovieChoice(a)
        })
      recommend(movieId)
        .then(res => {
          this.props.setRecommendations(res.results)
        })
    }
  }
  autocompleteSearch = q => {
    this.fetchMatches(q);
  }
  fetchMatches = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({_searches});
    
    if(q.length > 0 ) {
      searchMovies(q)
        .then((res) => {
          this.setState({results: res.results})
        })
    }
  }
  renderBlank(){
    return ({'backgroundImage':'none'})
  }
  renderBackground(){
    const { backdrop_path } = this.props.selectedMovie;
    const backgroundImage = getBackdropUrl(backdrop_path);
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