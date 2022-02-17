import axios from 'axios';
import React, { Component } from 'react'
import './Header.css';

export default class Header extends Component {
  
  handleClick = ()=>{
    console.log('clicked');
    this.props.history.push('/search')
  }
  handleClickAirplanes = ()=>{
    console.log('clicked');
    this.props.history.push('/admin/airplanes')
  }
  handleClickFlights = ()=>{
    console.log('clicked');
    this.props.history.push('/admin/flights')
  }

  handleClickReservations = ()=>{
    console.log('clicked Reservations');
    this.props.history.push('/reservations')
  }

  

  render() {
    return (
      <div className='header-wrapper'>

        <h1>ZZY Airlines</h1>
        <button onClick={this.handleClick}>Search Page</button>
        <button onClick={this.handleClickAirplanes}>Airplanes</button>
        <button onClick={this.handleClickFlights}>Flights</button>
        <button onClick={this.handleClickReservations}>My Reservations</button>

      </div>
    )
  }
}

