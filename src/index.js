
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  Converter from './components/converter/converter';

class App extends Component{
  render(){
    return (
      <div>
        <Converter/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
