import { useState, useCallback } from "react";
import { throttle, debounce } from 'throttle-debounce';
import { searchMovies, getMovie, getBackdropUrl } from './MovieApi.tsx'
type MovieSelectProps = {
    id: number;
    placeholder:string;
    selectedMovie: any;
    setMovieChoice:any; // FIXME
};

export const MovieSelect = ({id, placeholder, selectedMovie, setMovieChoice, setRecommendations}): Component<MovieSelectProps> => {
  const autoCompleteid = `autocomplete-${id}`
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState([])

  const getMatches = useCallback((q:string) => {
    searchMovies(q)
      .then((res) => {
        setResults(res.results)
      })
  }, [])

  const autocompleteSearchDebounced = debounce(300, getMatches);
  const autocompleteSearchThrottled = throttle(300, getMatches);
  
  const updateQuery = (event:Event) => {
    const input = event.target
    setQuery(input.value)
    if(query && query.length > 2) {
      autocompleteSearchThrottled(query);
    } else {
      autocompleteSearchDebounced(query);
    }

    const list = input.getAttribute('list')
    let options = document.querySelectorAll('#' + list + ' option')
    options = [...options]
    options.forEach(option => {
      if(option.value === input.value){
        getMovie(option.dataset.value)
          .then(a => setMovieChoice(a))
      }
    })
  }

  return (<div className={`moviePicker container ${id === 1 ? "container-red": "container-cyan"}`}>
      <div
        className="background"
        style={selectedMovie 
          ? {'backgroundImage': `url(${getBackdropUrl(selectedMovie.backdrop_path)})`} 
          : null
        }
      ></div>
      <input
        placeholder={placeholder}
        type="text"
        list={autoCompleteid}
        onChange={updateQuery}
        value={query}
      />
      <datalist className="movieAutocomplete" id={autoCompleteid}>
        {results.length > 0 ? results.map((result) => {
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
