import React, { Component } from 'react'
import "./BurningAirlines.css";
import "./Flight.css";

import axios from 'axios';

const RAILS_FLIGHTS_SHOW_BASE_URL = "http://localhost:3000/flights/"
const RAILS_RESERVATIONS_CREATE_BASE_URL = "" // TODO:


// Function to generate a 2d array
function generate2dArray(columns, rows) {
  const array2d = [];
  for (let i = 0; i < rows; i++) {
    let array1d = [];
    for (let j = 0; j < columns; j++) {
      array1d.push("");
    }
    array2d.push(array1d);
  }
  return array2d;
}

function populate2dArray(array, column, row, name) {
  array[column][row] = name;
}






export default class Flight extends Component {
  state = {
    flightData: {
      flight: {
        id: 0,
        origin: "",
        destination: "",
        date: "",
        airplane_id: 0
      },
      airplane: {
        total_columns: 0,
        total_rows: 0
      },
      reservations: [],
      user: {
        id: 0,
        name: ""
      },
      
    },
    newReservations: [],
      
    
    loading: false,
    error: null
    
  }

  componentDidMount() {
    this.fetchFlightData();
  }

  componentDidUpdate() {

  }

  // function to handle events when a seat is clicked
  handleClick = (column, row) => {
    console.log("handleClick(): Column:",column, "Row:", row);
    this.addNewReservation(column,row)
  }

  // function to render the plane's seat grid
  render2dArray = (grid) => {
    return(
      <div className='plane-seating-container'>
        {grid.map((item, row) => {
            return (
              <div className='plane-seating-row'>
                {item.map((sItem, column) => 
                  sItem? 
                  <div className="plane-seating-seat booked">{sItem}</div>
                  :
                  <div className="plane-seating-seat available" onClick={() => this.handleClick(column, row)}>
                    {`${row+1}${String.fromCharCode(column+65)}`}
                  </div>
                )}
              </div>
            )
          })}
      </div>
    )
  }


  addNewReservation = (column, row) => {
    const newRes = {
      flight_id: this.state.flightData.flight.id, 
      user_id: this.state.flightData.user.id,
      seat_row: row,
      seat_column: column
    }
    console.log("newRes: ", newRes);
    this.setState({
      newReservations: [newRes, ...this.state.newReservations]
    })
    console.log("this.state.newReservations: ", this.state.newReservations);
  }
  



  commitNewReservation = async () => {

    try {
      const res = await axios.post(
        RAILS_FLIGHTS_SHOW_BASE_URL)
  
    } catch (err) {
      console.log('Error making reservation:', err)
    }
  
  }

  fetchFlightData = async () => {
    try {
      const res = await axios.get(`${RAILS_FLIGHTS_SHOW_BASE_URL}${this.props.match.params.id}`  );
      console.log('getFlightData():', res.data);
      this.setState({flightData: res.data, loading: false});
      console.log('this.state.flightData: ',this.state.flightData)
    } catch (err) {
      console.log('error:', err);
      this.setState({error: err})
    }
  }
  
  
  
  

  render() {
    const rows = this.state.flightData.airplane.total_rows;
    const columns = this.state.flightData.airplane.total_columns;
    const flightID = this.state.flightData.flight.id;
    const date = this.state.flightData.flight.date;

    const userID = this.state.flightData.user.id;
    
    const origin = this.state.flightData.flight.origin;
    const destination = this.state.flightData.flight.destination;
    const reservations = this.state.flightData.reservations;

    const seatGrid = generate2dArray(columns, rows);

    if (reservations.length !== 0) {
      reservations.forEach( r => {
        populate2dArray(seatGrid, r.seat_column, r.seat_row, r.name)
      })
    }
    
    

    const {loading, error} = this.state

    return (
      <div>
        {
          loading
          ?
          <h3>Loading...</h3>
          :
          <div>
            
            <h3>{date} | Flight {flightID} | {origin} {'>'} {destination}</h3> 
            <div>{this.render2dArray(seatGrid)}</div>
          </div>
        }
        

        
        
      </div>
    )
  }
}

