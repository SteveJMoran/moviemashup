import React, { ReactElement } from "react"

type TitleProps = {
  scrollToRef: any
}

export const Title = ({ scrollToRef }): ReactElement<TitleProps> => {
  return <div className="panel">
    <header className="container">
      <h1>Movie Mashup</h1>
      <p>Pick two movies and Movie Mashup will recomend a movie based on your selections!</p>
      <a
        className="start-button"
        href="#selectOne">Start</a>
    </header>
  </div>
}