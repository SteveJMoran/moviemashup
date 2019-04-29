/// on github: https://stevejmoran.github.io/moviemashup

import React, { Component } from 'react';
import axios from 'axios';
import appConfig from './constants.js';

import './App.scss';

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
        <MovieForm />
        <Footer />
      </div>
    );
  }
}

export default App;
