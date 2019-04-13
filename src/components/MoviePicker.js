import React, { Component } from 'react';
import axios from 'axios';
import { throttle, debounce } from 'throttle-debounce';

const API_TOKEN = process.env.REACT_APP_API_KEY

class MoviePicker extends Component {
  constructor(props) {
    super(props);
    this.id = "autocomplete-"+props.id
    this.state = { q: "", results: []};
    this.autocompleteSearchDebounced = debounce(300, this.autocompleteSearch);
    this.autocompleteSearchThrottled = throttle(300, this.autocompleteSearch);
  }

  changeQuery = event => {
    this.setState(
      {q: event.target.value},
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

  autocompleteSearch = q => {
    this.fetch(q);
  }

  fetch = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({_searches});

    this.searchMovies(q);
  }
  async searchMovies (q) {
    try {

      const qUrl = "https://api.themoviedb.org/3/search/movie";
      const qParams = {
        crossDomain: true,
        api_key: API_TOKEN,
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
  renderSearchResults() {
    const { results } = this.state;
    const resultsHtml = results.map(result => {
      const {
        id,
        title,
        release_date: date
      } = result;
    const year = parseInt(date);

      return(
        
        <option
        key={id}>
          { title } ({year})
        </option> 
      )
    })
    return resultsHtml;
  }
  render() {
    return (
      <div className="moviePicker">
        <div className="moviePoster"></div>
        <input
          placeholder="Pick a movie"
          type="text"
          list={this.id}
          onChange={ this.changeQuery }
        /> 
        <datalist className="movieAutocomplete" id={ this.id }>
          { this.renderSearchResults() }
        </datalist> 
      </div>
    )
  }

}

export default MoviePicker;