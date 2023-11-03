import { useState, StrictMode } from "react"
import { Title } from "./Title";
import { MovieSelect } from "./MovieSelect";
import { Credits } from "./Credits";
import { getPosterUrl, getRecommendations } from './MovieApi.tsx'
import "../App.scss";

type MovieMashupProps = {};

export const MovieMashup = (props): Component<MovieMashupProps> => {
  const [recommendation, setRecommendation] = useState(undefined)
  const [recommendations, setRecommendations] = useState([])
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
  const recommend = () => {
    console.log("analyzing..")
    const results = filterRecommendations(recommendations)
    setRecommendation(results[0])
  }

  const filterRecommendations = (rec:any[]) => {
    const selectedIds = selectedMovies.map(m => m.id)
    return rec.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id 
      ))
    ).filter(movie => selectedIds.indexOf(movie.id) === -1 )
  }

  const updateRecommendations = (id:number) => {
    getRecommendations(id)
    .then(res => {
      let updatedRecommendations = [...recommendations, ...res.results]
      setRecommendations(updatedRecommendations)
    })
  }

  const resetForm = (e:Event) => {
    setRecommendation(undefined)
    setSelections([undefined, undefined])
  }
  
  return (
    <StrictMode>
    <div>
      <Title />
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
    </StrictMode>
  );
};
