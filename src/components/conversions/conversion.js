import React, { Component } from 'react';
import './conversion.css';

class Conversion extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedCurrencies :[],
      currencies: Object.keys(props.conversionList.rates),
      showSearch : false,
      searchValue: ''
    }

    this.showsearch = this.showsearch.bind(this);
    this.showCurrency = this.showCurrency.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(evt) {
      this.setState({
        searchValue: evt.target.value
      });
   }

  list(){
    if(this.state.selectedCurrencies.length){
    return this.state.selectedCurrencies.map((item,index)=>{
      let conversionToCurr = this.props.conversionList.rates[item] * this.props.usd;
      return (
       <div  key={index} className="list-item">
         <div className="left-text">
          <div className="left">
            <div className="currency-name">{item}</div>
            <div className="currency-match">1USD = {this.props.conversionList.rates[item]}</div>
          </div>
          <div className="right">{conversionToCurr}</div>
         </div>
         <div className="right-text" onClick={()=>this.removeCurrency(item)}> <span>(-)</span></div>
       </div>
    )});
  }else{
    return (
      <div className="empty-list">No curency selected</div>
    )
  }
  }

  showsearch(){
    this.setState({
      showSearch: true
    })
  }

  showCurrency(){
    let selCurr = this.state.selectedCurrencies;
    if(this.state.searchValue !== '' && this.state.currencies.indexOf(this.state.searchValue) >=0)
       selCurr.push(this.state.searchValue);

    this.setState({
      showSearch: false,
      selectedCurrencies: selCurr,
      searchValue: ''
    })
  }

  removeCurrency(curr){
    let selCurr = this.state.selectedCurrencies;
    selCurr.splice([selCurr.indexOf(curr)],1);

    this.setState({
      selectedCurrencies: selCurr
    });
  }

  optionList(){
    let list= [];
    for (let index in this.state.currencies) {
      list.push(<option key={index} value={this.state.currencies[index]}/>)
    }
    return list;
  }

  searchInput(){
    if(this.state.showSearch){
    return (
      <div className="search">
        <input className="base-input" list="currency-list" value={this.state.searchValue} onChange={evt => this.updateInputValue(evt)}/>
              <datalist id="currency-list">
                {this.optionList()}
              </datalist>
          <input className="submit" type="button" value="Submit" onClick={this.showCurrency}/>
      </div>
    )
   }else{
    return (
      <div className="add-more" onClick={this.showsearch}>(+) Add More Currencies</div>
    )
   }
  }


  render(){
    return (
      <div className="conversions">
        {this.list()}
        {this.searchInput()}
      </div>
    )
  }
}

export default Conversion;