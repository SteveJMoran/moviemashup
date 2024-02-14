import React, { useState, StrictMode, ReactElement } from "react"
import { Title } from "./Title";
import { MovieSelect } from "./MovieSelect";
import { Credits } from "./Credits";
import { getPosterUrl, getRecommendations } from './MovieApi.tsx'
import "../App.scss";
import { Movie } from "../types.ts";
 
type MovieMashupProps = {};

export const MovieMashup = (props): ReactElement<MovieMashupProps> => {
  const [recommendation, setRecommendation] = useState<Movie|undefined>(undefined)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [selectedMovies, setSelections] = useState([undefined, undefined])

  const renderRecommendation = (rec:Movie):ReactElement=> {
    return (
      <div className="result">
        <h3>You should watch:</h3>
        <img src={getPosterUrl(rec.poster_path)} alt={rec.title} />
        <h2>{rec.title}</h2>
        <p>{rec.overview}</p>
      </div>
    )
  }
  const recommend = () => {
    console.log("analyzing..")
    const results = filterRecommendations(recommendations)
    setRecommendation(results[0])
  }

  const filterRecommendations = (rec: Movie[]) => {
    const selectedIds = selectedMovies.map(m => m.id)
    return rec.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id
      ))
    ).filter(movie => selectedIds.indexOf(movie.id) === -1)
  }

  const updateRecommendations = (id: number) => {
    getRecommendations(id)
      .then(res => {
        let updatedRecommendations = [...recommendations, ...res.results]
        setRecommendations(updatedRecommendations)
      })
  }

  const resetForm = () => {
    setRecommendation(undefined)
    setSelections([undefined, undefined])
  }

  return (
    <StrictMode>
      <div>
        <Title scrollToRef={} />
        <form>
          <div className="panel panel-half" id="selectOne">
            <MovieSelect
              id={1}
              placeholder={"Pick a Movie"}
              selectedMovie={selectedMovies[0]}
              setMovieChoice={(movie) => {
                setSelections([movie, selectedMovies[1]])
                updateRecommendations(movie.id)
              }}
            />
          </div>
          <button onClick={recommend}>Recommend</button>
          <div className="panel panel-half">
            <MovieSelect
              id={2}
              placeholder={"Pick another Movie"}
              selectedMovie={selectedMovies[1]}
              setMovieChoice={(movie) => {
                setSelections([selectedMovies[0], movie])
                updateRecommendations(movie.id)
              }}
            />
          </div>
          <div className="panel" id="recommendation">
            <div className="container">
              {recommendation
                ? renderRecommendation(recommendation)
                : <div className="loading-recommendation">Loading</div>}
              <div className="reset-container">
                <button
                  type="button"
                  className="reset-button"
                  onClick={_ => resetForm()}>Reset</button>
              </div>
            </div>
          </div>
        </form>
        <Credits />
      </div>
    </StrictMode>
  );
};
