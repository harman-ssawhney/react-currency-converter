import React, { Component } from 'react';
import './converter.css';
import  Conversion from '../conversions/conversion';
import axios from 'axios';

class Converter extends Component{
  constructor(props){
    super(props)
    this.state={
      conversionList: null,
      usd: 1
    }
  }

  componentDidMount(){
     // api call to fetch different currencies and their rates with respect to USD
     axios.get("https://api.exchangeratesapi.io/latest?base=USD")
     .then(res=>{
       console.log(res);
       this.setState({
         conversionList : res.data
       })
     })
     .catch(err=>{
       console.log(err);
     });
  }

  // update value to USD
  updateUsd(evt){
    this.setState({
      usd: evt.target.value
    })
  }

  render(){
    // render conversions list  and will show loading untill the data is fetched from api for differenct currency rates
    if(this.state.conversionList){
    return (
      <div className="converter">
        <div className="top-text">USD - United States Dollars</div>
        <div className="base-currency">
          <span className="base-currency-text"> USD</span>
          <input className="base-input" type="number" value={this.state.usd} onChange={evt=>this.updateUsd(evt)}/>
        </div>
        <Conversion conversionList={this.state.conversionList} usd={this.state.usd}/>
      </div>
    )
  }else{
    return (
    <div className="converter">
      <div className="top-text">USD - United States Dollars</div>
      <div className="base-currency">
        <span className="base-currency-text"> USD</span>
        <input className="base-input" type="text" />
      </div>
      <div className="loading">Loading...</div>
    </div>
   )
  }
  }
}

export default Converter;
