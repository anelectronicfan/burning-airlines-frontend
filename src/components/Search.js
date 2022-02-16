import axios from "axios";
import React, { Component } from "react";
import FlightResult from './FlightResult'
import './Search.css'

const RAILS_FLIGHTS_BASE_URL = "http://localhost:3000/search";

export default class Search extends Component {
  state = {
    queryFrom: "", //TODO: set this back to empty string
    queryTo: "", //TODO: set this back to empty string
    searchResults: [], // results to show on the page
    loading: false, // controls whether or not to show loading message
    error: null, // whether or not to show an error message
  };

  componentDidUpdate() {
    if (this.state.queryFrom === "" || this.state.queryTo === "") {
      clearInterval(this.liveSearchUpdates)
      return;
    }
  }

  componentWillUnmount() {
    clearInterval(this.liveSearchUpdates)
  }




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
    if (this.state.queryFrom === "" || this.state.queryTo === "") {
      clearInterval(this.liveSearchUpdates)
      return;
    }
    
    clearInterval(this.liveSearchUpdates)
    e.preventDefault();
    console.log(`SUBMIT! from: ${this.state.queryFrom}, to: ${this.state.queryTo}`);
    this.setState({ loading: true });
    this.getResults()
    this.setState({loading: false})
    
    this.liveSearchUpdates = window.setInterval(() => {
      this.getResults();
    }, 5000)
  };

  
  getResults = async () => {
    try {
    const res = await axios.get(RAILS_FLIGHTS_BASE_URL, {params: {origin: this.state.queryFrom, destination: this.state.queryTo}});
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
          <table className="search-results-container">
            <tbody>
            <tr>
              <th>Date</th>
              <th>Flight</th>
              <th>From</th>
              <th>To</th>
              <th>Plane </th>
              <th>Seats Left</th>
            </tr>
              {this.state.searchResults.map(flight => <FlightResult info={flight} key={flight.id} history={this.props.history}/>)}
            </tbody>
          </table>
        }
      </div>
    );
  }
}
