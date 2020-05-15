import React, { Component } from 'react';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Styles from './App.module.css';
import { fetchData } from './api'
import corona from './images/image.png'




class App extends Component {
  state = {
    data: {},
    country:"",
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) =>{
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData , country: country})
    
  }


  render() {
    const { data , country} = this.state;

    return (
      <div className={Styles.container}>
        <img className={Styles.image} src={corona} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />

      </div>
    );
  }
}

export default App;