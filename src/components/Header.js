import axios from 'axios';
import React, { Component } from 'react'
import './Header.css';

export default class Header extends Component {
  
  handleClick = ()=>{
    console.log('clicked');
    this.props.history.push('/search')
  }

  handleClickReservations = ()=>{
    console.log('clicked Reservations');
    this.props.history.push('/reservations')
  }

  

  render() {
    return (
      <div className='header-wrapper'>
        <h1 className="logo-airlines">ZZY Airlines</h1>
        <nav>
          <button onClick={this.handleClick}>Search Page</button>
          <button onClick={this.handleClickReservations}>My Reservations</button>
        </nav>
      </div>
    )
  }
}

