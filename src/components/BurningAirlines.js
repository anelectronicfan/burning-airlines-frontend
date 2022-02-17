import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./BurningAirlines.css";
import axios from 'axios';

import Header from "./Header";
import Search from "./Search";
import Flight from "./Flight";
import Reservations from "./Reservations";
import AirplanesIndex from "./AirplanesIndex";
import FlightsIndex from "./FlightsIndex";

import Login from './Login'
import MyProfile from './MyProfile'

const BASE_URL = 'http://localhost:3000/'





export default class BurningAirlines extends Component {
  state = {
    currentUser: undefined
  }

  componentDidMount() {
    this.setCurrentUser();
  }

  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    console.log(token);
    axios.get(`${BASE_URL}users/current`, {
      headers: {
        'Authorization': token
      }
    })
    .then (res => {
      this.setState({currentUser: res.data})
    })
    .catch (err => console.warn(err))
  }

  handleLogout = () => {
    this.setState({currentUser: undefined})
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  
  render() {
    return (
      
      <div className='page-wrapper'>
        
      <Router>
        {
              this.state.currentUser !== undefined
              ?
              (
                <ul>
                  <li>Welcome {this.state.currentUser.name} |</li>
                  <li><Link to = '/my_profile'>My Profile</Link></li>
                  <li><Link onClick = {this.handleLogout} to = '/'>Logout</Link></li>
                </ul>
              )
              :
              (
                <ul>
                  <li><Link to='/login'>Login</Link></li>
                </ul>
              )
          }

        <Route path='/' component={Header} currentUser={this.state.currentUser}/>

        <Route path='/search' component={Search}/>
        <Route path='/flight/:id' component={Flight} currentUser={this.state.currentUser}/>
        <Route path='/reservations' component={Reservations}/>

        <Route path='/admin/flights' component={FlightsIndex}/>
        <Route path='/admin/airplanes' component={AirplanesIndex}/>

        <Route exact path = '/my_profile' component = {MyProfile} />
        <Route 
          exact path = '/login' 
          render={(props) => <Login setCurrentUser = {this.setCurrentUser}{...props}/>}
          />


          

      </Router>

      <footer> &copy; ZZY AIRLINES </footer>
      </div>
    )
  }
}
