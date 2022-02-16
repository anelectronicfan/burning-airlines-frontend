import React, { Component } from 'react'
import axios from 'axios';


const RAILS_FLIGHTS_SHOW_BASE_URL = "http://localhost:3000/flights/"

export default class FlightsIndex extends Component {

  componentDidMount() {
        console.log("Welcome Flights Index: ");
        this.getFlightsIndex();
    }
    

    getFlightsIndex = async () => {
        console.log("hello")
        try{
            const res = await axios.get( RAILS_FLIGHTS_SHOW_BASE_URL);
            console.log("Flights Index Response: ",res.data);
        }catch(err){
            console.log('ERROR loading AJAX flights index: ',err);
        }
    }//get Reservations

  render() {
    return (
      <div>
        <h1>FlightsIndex</h1>



      </div>


    )
  }
}
