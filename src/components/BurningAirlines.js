import React, { Component } from 'react'
import { HashRouter as Router, Route } from "react-router-dom";
import "./BurningAirlines.css";

import Header from "./Header";
import Search from "./Search";
import Flight from "./Flight";
import AirplanesIndex from "./AirplanesIndex"
import FlightsIndex from "./FlightsIndex"


export default class BurningAirlines extends Component {

  
  render() {
    return (
      
      <div className='page-wrapper'>
        
      <Router>

        <Route path='/' component={Header}/>
        <Route path='/search' component={Search}/>
        <Route path='/flight/:id' component={Flight}/>
        <Route path='/admin/flights' component={FlightsIndex}/>
        <Route path='/admin/airplanes' component={AirplanesIndex}/>

      </Router>
      </div>
    )
  }
}
