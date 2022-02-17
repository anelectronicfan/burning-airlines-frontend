
import React, { Component } from 'react'
import './Header.css';


import { HashRouter as Router, Route, Link } from "react-router-dom";




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

  renderButtons = () => {
    const currentUser = this.props.route.currentUser
    
  }
  

  render() {
    return (
      <Router>
        <div className='header-wrapper'>

          <h1>ZZY Airlines</h1>
          <div className="nav-button">

            <button onClick={this.handleClick}>Search Page</button>
            <button onClick={this.handleClickAirplanes}>Airplanes</button>
            <button onClick={this.handleClickFlights}>Flights</button>
            
          </div>
          
        

        </div>
        
      </Router>
    )
  }
}

