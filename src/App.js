import React, { Component } from 'react';
import axios from 'axios';
import appConfig from './constants.js';

import './App.css';

import Header from './components/Header';
import MovieForm from './components/MovieForm';

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
      <div className="container">
        <Header />
        <MovieForm />
      </div>
    );
  }
}

export default App;
