import React, { Component } from 'react'
import "./BurningAirlines.css";
import "./Flight.css";

import axios from 'axios';

const RAILS_FLIGHTS_SHOW_BASE_URL = "http://localhost:3000/flights/"
const RAILS_RESERVATIONS_CREATE_BASE_URL = "http://localhost:3000/reservations"


function generate2dArray(columns, rows) {
  Array(rows)
  const array2d = [];

  for (let i = 0; i < rows; i++) {
    let array1d = [];

    for (let j = 0; j < columns; j++) {
      array1d.push({name:'', hold: false});
    }
    array2d.push(array1d);
  }
  return array2d;
}

function populate2dArray(array, column, row, name) {
  array[column][row].name = name;
}

function populate2dArrayHolds(array, column, row) {
  array[column][row].hold = true;
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
    // const that = this; - Don't do this again, just don't code drunk and use an arrow function next time

    this.liveReservationUpdates = window.setInterval(() => {
      this.fetchFlightData();

      const copyNewRes = this.state.newReservations.slice()
      
      this.setState({newReservations: copyNewRes.filter(r => {
        return !this.doesReservationExist(r)
      })})

      // this.setState({newReservations: copyNewRes.filter(hold=>{
      //   return !(hold.seat_row === row && hold.seat_column === column)
      // }
      //const existingHold = this.state.newReservations.find(res=> res.seat_row === row && res.seat_column === column)

      
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.liveReservationUpdates)
  }

  doesReservationExist = (r) => {
    const ResStringify = JSON.stringify(this.state.flightData.reservations)
    const rStringify = JSON.stringify(r)
    return ResStringify.includes(rStringify)
  }

  componentDidUpdate() {
    console.log("this.state.newReservations: ", this.state.newReservations);
  }

  // function to handle events when a seat is clicked
  handleClick = (column, row) => {
    console.log("handleClick(): Column:",column, "Row:", row);

    const existingHold = this.state.newReservations.find(res=> res.seat_row === row && res.seat_column === column)

    if(existingHold){
      console.log('EXISTING HOLD');
      const copyNewRes = this.state.newReservations.slice()

      this.setState({newReservations: copyNewRes.filter(hold=>{
        return !(hold.seat_row === row && hold.seat_column === column)
      })})
    }else{
      this.addNewReservation(column,row);
    }
    
  }

  // function to render the plane's seat grid
  render2dArray = (grid) => {
    return(
      <div className='plane-seating-container'>
        {grid.map((item, row) => {
            return (
              <div key={row} className='plane-seating-row'>
                {item.map((sItem, column) => 
                  sItem.name? 
                  <div key={`${row+1}${String.fromCharCode(column+65)}`} className="plane-seating-seat booked">{sItem.name}</div>
                  :
                  <div key={`${row+1}${String.fromCharCode(column+65)}`} className={sItem.hold? "plane-seating-seat hold" : "plane-seating-seat available"} onClick={() => this.handleClick(column, row)}>
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
      seat_row: row,
      seat_column: column,
      flight_id: this.state.flightData.flight.id,
      user_id: this.state.flightData.user.id
    }
    console.log("newRes: ", newRes);
    this.setState({
      newReservations: [newRes, ...this.state.newReservations]
    })
  }


  // handleReservationsClick = ()=>{
  //   this.state.newReservations.forEach(res=>{
  //     this.commitNewReservation(res)
  //   })
  // }

  // commitNewReservation = async (resObj) => {

  //   try {
  //     const res = await axios.post(RAILS_RESERVATIONS_CREATE_BASE_URL, resObj)
  //     console.log('commitNewReservation()', res);
  //   } catch (err) {
  //     console.log('Error making reservation:', err)
  //   }
  
  // }

 

  handleReservationsClick = async () => {

    try {
      const res = await axios.post(RAILS_RESERVATIONS_CREATE_BASE_URL, this.state.newReservations)
      console.log('commitNewReservation()', res);
      this.fetchFlightData();
      // clear newReservations
      this.setState({newReservations: []})

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

    
    
    const origin = this.state.flightData.flight.origin;
    const destination = this.state.flightData.flight.destination;
    const reservations = this.state.flightData.reservations;

    const seatGrid = generate2dArray(columns, rows); // 2darray

    if (reservations.length !== 0) {
      reservations.forEach( r => {
        populate2dArray(seatGrid, r.seat_row, r.seat_column, r.name)
      })
    }

    if (this.state.newReservations.length !== 0) {
      this.state.newReservations.forEach( r => {
        populate2dArrayHolds(seatGrid, r.seat_row, r.seat_column)
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
          <div className='seat-reservation-wrapper'>
            <div className='plane-container'>
              <h3>{date} | Flight {flightID} | {origin} {'>'} {destination}</h3> 
              <div>{this.render2dArray(seatGrid)}</div>
            </div>
            <div className='holding-list'>
              <h4>Holding {this.state.newReservations.length} Seats</h4>
              <button onClick={this.handleReservationsClick}>Make Reservation</button>
              {this.state.newReservations.map(r => <div key={`${r.seat_row+1}${String.fromCharCode(r.seat_column+65)}`}>{`${r.seat_row+1}${String.fromCharCode(r.seat_column+65)}`} </div>)}
            </div>
          </div>
          
        }
      </div>
    )
  }
}

