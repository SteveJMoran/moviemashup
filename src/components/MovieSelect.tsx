import React, { ReactElement } from "react"
import { useState, useCallback } from "react";
import { throttle, debounce } from 'throttle-debounce';
import { searchMovies, getMovie, getBackdropUrl } from './MovieApi.tsx'
import { Movie } from "../types.ts"

type MovieSelectProps = {
  id: number;
  placeholder: string;
  selectedMovie: any;
  setMovieChoice: any; // FIXME
};

export const MovieSelect = ({ id, placeholder, selectedMovie, setMovieChoice }): ReactElement<MovieSelectProps> => {
  const autoCompleteid = `autocomplete-${id}`
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState([])

  const getMatches = useCallback((q: string) => {
    searchMovies(q)
      .then((res) => {
        setResults(res.results)
      })
  }, [])

  const autocompleteSearchDebounced = debounce(300, undefined, getMatches);
  const autocompleteSearchThrottled = throttle(300, undefined, getMatches);

  const updateQuery = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input) {
      setQuery(input.value)
    }
    if (query && query.length > 2) {
      autocompleteSearchThrottled(query);
    } else {
      autocompleteSearchDebounced(query);
    }

    const list = input.getAttribute('list')
    let options = [...document.querySelectorAll('#' + list + ' option')]
    options.forEach(option => {
      if (option.value === input.value) {
        getMovie(option.dataset.value)
          .then(a => setMovieChoice(a))
      }
    })
  }

  return (<div className={`moviePicker container ${id === 1 ? "container-red" : "container-cyan"}`}>
    <div
      className="background"
      style={selectedMovie
        ? { 'backgroundImage': `url(${getBackdropUrl(selectedMovie.backdrop_path)})` }
        : undefined
      }
    ></div>
    <input
      placeholder={placeholder}
      type="text"
      list={autoCompleteid}
      onChange={(e) => updateQuery(e)}
      value={query}
      name="movie-select"
    />
    <datalist className="movieAutocomplete" id={autoCompleteid}>
      {results.length > 0 ? results.map((result: Movie) => {
        return (
          <option
            key={result.id}
            data-value={result.id}
            value={`${result.title} (${parseInt(result.release_date)})`}
          />
        );
      }) : null}
    </datalist>
  </div>);
};
