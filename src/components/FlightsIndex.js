import React, { Component } from 'react'
import axios from 'axios';
import Select from 'react-select';
import FlightsForm from './FlightsForm';
import './FlightsIndex.css';


const RAILS_FLIGHTS_SHOW_BASE_URL = "http://localhost:3000/api/admin/flights/"
const RAILS_FLIGHTS_DELETE_BASE_URL = `http://localhost:3000/api/flights/${id}/delete`


export default class FlightsIndex extends Component {

  state = {
    flights: [],
    id: '',
    origin: '',
    destination: '',
    date: '',
    plane: '',
    loading: true,
  
  }

  componentDidMount() {
    console.log("Welcome Flights Index: ");
    this.getFlightsIndex();
    window.setInterval(this.getFlightsIndex,30000);
  }
    
  getFlightsIndex = async () => {
    try{
        const res = await axios.get( RAILS_FLIGHTS_SHOW_BASE_URL);
        console.log("Flights Index Response: ",res.data);
        this.setState({flights: res.data, loading:false })
    }catch(err){
        console.log('ERROR loading AJAX flights index: ',err);
    }
  }//getFlightIndex

  deleteFlight = async () => {
    try{
      const res = await axios.delete(RAILS_FLIGHTS_DELETE_BASE_URL, {params: id })
      console.log('delete url: ',id)

      this.setState({
        flights: [ res.data, ...this.state.flights ]
      })
    }catch(err){
      console.log( 'Error deleting flights: ', err)
    }
  };

  handleDelete=(e) =>{
    e.preventDefault()
    console.log('Delete clicked');
    this.deleteFlight();
  }

  render() {
    const { loading, flights } = this.state;
    
   
    return (

      <div>
        <h1>FlightsIndex</h1>
        
        <FlightsForm />

        {
          loading
          ?
          <p>Loading flights...</p>
          :
          <div className="flightIndex">
            <p>All Flights</p>
            <ul>
              <p className="sectionTitle">Date</p>
              {
                flights.map( f => <li key={f.id}>{f.date}</li>)
              }
            </ul>
            <ul>
              <p className="sectionTitle">Flight ID</p>
              {
                flights.map( f => <li key={f.id}>{f.airplane_id}</li>)
              }
            </ul>
            <ul>
              <p className="sectionTitle">To > From</p>
              {
                flights.map( f => <li key={f.id}>{f.origin} > {f.destination}</li>)
              }
            </ul>
            <ul>
              <p className="sectionTitle">Seats</p>
              {
                flights.map( f => <li key={f.id}>{f.remaining_seats}</li>)
              }
            </ul>
            <ul>
              <p className="sectionTitle">Delete</p>
              {
                flights.map( f => 
                  <li key={f.id}>
                  <button onClick={this.handleDelete}>Delete</button>
                  </li>)
              }
            </ul>
          </div>
        }
      


      </div>


    )
  }
}
