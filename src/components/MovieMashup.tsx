import { useState, useEffect } from "react"
import { Title } from "./Title";
import { MovieSelect } from "./MovieSelect";
import { Credits } from "./Credits";
import { getPosterUrl, getRecommendations } from './MovieApi.tsx'
import "../App.scss";

type MovieMashupProps = {};

export const MovieMashup = (props): Component<MovieMashupProps> => {
  const [recommendation, setRecommendation] = useState(undefined)
  const [selectedMovies, setSelections] = useState([undefined, undefined])

  const renderRecommendation = () => {
    //document.getElementById("recommendation").scrollIntoView();
    return (
      <div className="result">
        <h3>You should watch:</h3>
        <img src={getPosterUrl(recommendation.poster_path)} alt={recommendation.title}/>
        <h2>{ recommendation.title }</h2>
        <p>{ recommendation.overview }</p>
      </div>
    )
  }
  const recommend = async () => {
    console.log("analyzing..")
    console.log(selectedMovies)
    const recoPool = [];
    await selectedMovies.forEach((m) => {
      console.log(m)
      getRecommendations(m.id)
        .then(results => recoPool.concat(results))
    })

    console.log(recoPool)

    // get recomendations
  }
  const resetForm = (e:Event) => {
    setRecommendation(undefined)
    setSelections([undefined, undefined])
  }
  
  return (
    <div>
      <Title />
      <form>
        <div className="panel panel-half" id="selectOne">
          <MovieSelect
            id={1}
            placeholder={"Pick a Movie"}
            selectedMovie={selectedMovies[0]}
            setMovieChoice={(movie) => {
              console.log(movie)
              setSelections([movie, selectedMovies[1]])
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
            }}
          />
        </div>
        <div className="panel" id="recommendation">
          <div className="container">
            {recommendation
              ? renderRecommendation()
              : <div className="loading-recommendation">Loading</div>}
            <div className="reset-container">
              <button
                type="button"
                className="reset-button"
                onClick={(event) => {
                  resetForm(event);
                }}>Reset</button>
            </div>
          </div>
        </div>
      </form>
      <Credits />
    </div>
  );
};
