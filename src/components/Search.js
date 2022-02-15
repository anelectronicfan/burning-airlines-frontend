import axios from "axios";
import React, { Component } from "react";
import FlightResult from './FlightResult'

// TODO: Check this URL once rails is setup! We want to get all the flights back.
const RAILS_FLIGHTS_BASE_URL = "http://localhost:3000/flights";

const TEMP_RES = [
  {
  id: 1,
  origin: 'SYD',
  destination: 'MEL',
  date: '2022/10/1',
  airplane_id: 99,
  remaining_seats: 30
  },
  {
    id: 2,
    origin: 'BNE',
    destination: 'ABC',
    date: '2024/9/1',
    airplane_id: 9,
    remaining_seats: 3
    },
]


export default class Search extends Component {
  state = {
    queryFrom: "",
    queryTo: "",
    searchResults: [], // results to show on the page
    loading: false, // controls whether or not to show loading message
    error: null, // whether or not to show an error message
  };

  // Handles the input to both text fields ("To" and "From")
  handleChange = (e) => {
    // console.log(e.target.getAttribute('data-query'));
    if (e.target.getAttribute("data-query") === "from") {
      // If the input has the data-query value of "from"
      this.setState({ queryFrom: e.target.value.toUpperCase() }); // Set the state of queryFrom to the value
    } else {
      // The inputs data-query must be "to"
      this.setState({ queryTo: e.target.value.toUpperCase() }); //Set the state of queryTo to the value
    }
  };

  // Handle the form submission
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`SUBMIT! from: ${this.state.queryFrom}, to: ${this.state.queryTo}`);
    this.setState({ loading: true });
    // this.getResults()
    this.setState({searchResults: TEMP_RES}) //TODO: REMOVE THIS ONCE AXIOS IS RUNNING
    this.setState({loading: false})
  };

  // TODO: Check this works!!!
  getResults = async () => {
    try {
      const res = await axios.get(RAILS_FLIGHTS_BASE_URL, {from: this.state.from, to: this.state.to});
      console.log('Flights Response: ', res.data);
      this.setState({searchResults: res.data})
    } catch (err) {
      console.log("ERROR AJAX FLIGHT: ", err);
      this.setState({ error: err });
    }
  };

  render() {
    
    
    return (
      <div>
        <div className="search-form-container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="From"
              data-query="from"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="To"
              data-query="to"
              onChange={this.handleChange}
            />
            <button>Search</button>
          </form>
        </div>
        {
          this.state.loading
          ?
          <p>Loading Results</p>
          :
          this.state.searchResults.map(flight => <FlightResult info={flight} key={flight.id}/>)
        }

      </div>
    );
  }
}
