import React, { Component } from 'react';
import axios from 'axios';
import appConfig from './constants.js';

import './App.scss';

import Header from './components/Header';
import MovieForm from './components/MovieForm';
import Footer from './components/Footer';

class App extends Component {
  componentDidMount() {
    //this.getConfig();
  }
  async getConfig() {

    try {
      const qUrl = `${appConfig.API_URL}/configuration`;
      const qParams = {
        crossDomain: true,
        api_key: appConfig.API_TOKEN
      }
      const configData = await axios.get(qUrl, {params: qParams})

      console.log(configData)

    } catch(e) {
      console.error(e.message)
    }
  }
  render() {
    return (
      <div>
      <div className="container">
        <Header />
        <button className="start-button" href={"#"}>Start</button>
      </div>

        <MovieForm />
        <Footer />
      </div>
    );
  }
}

export default App;
