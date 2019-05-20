import axios from 'axios';

export default function fetchRates(){

  return axios.get("https://api.exchangeratesapi.io/latest?base=USD");

}
