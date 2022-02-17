import axios from 'axios';
import React, { Component } from 'react';
import './FlightsIndex.css';



const RAILS_AIRPLANES_BASE_URL = "http://localhost:3000/airplanes";
const RAILS_CREATE_FLIGHT_URL = "http://localhost:3000/flights/"

const selectPlanes = [
    {label: "test1", value: 1},
    {label: "test2", value: 2},
    {label: "test3", value: 3},
]
    

export default class FlightsForm extends Component {

    state = {
        flightID: '',
        origin: '',
        destination: '',
        date: '',
        plane: '',
        searchResults: []
    };

    handleSubmit= async (e) =>{
        e.preventDefault()
        console.log('submit clicked');
        const newFlight = {
            flight_id: this.state.flightID,
            origin: this.state.origin,
            destination: this.state.destination,
            date: this.state.date,
            airplane_id: this.state.plane
        }
        try {
            const res = await axios.post(RAILS_CREATE_FLIGHT_URL, newFlight)
            console.log('post newFlight ', res);
        } catch (err) {
            console.log('Error making new flight: ', err);
        }

    }


      getAirplanes = async () => {
        try {
        const res = await axios.get(RAILS_AIRPLANES_BASE_URL)
          console.log('Airplanes Response: ', res.data);
          this.setState({searchResults: res.data})
        } catch (err) {
          console.log("ERROR AJAX AIRPLANES: ", err);
          this.setState({ error: err });
        }
      };
    
      componentDidMount(){
        this.getAirplanes()
      }




    render(){
        return(

        <div className="flightIndex">
            <p>Add New Flight</p>
            <form onSubmit={this.handleSubmit}>
                <div className="form-input-container">
                <label>Origin</label>
                <input 
                type="text"
                placeholder="Origin"
                onChange={(e)=>this.setState({origin: e.target.value})} 
                />
                <label>Destination</label>
                <input 
                type="text"
                placeholder="Destination" 
                onChange={(e)=>this.setState({destination: e.target.value})} 
                />
                <label>Date</label>
                <input 
                type="date" 
                onChange={(e)=>this.setState({date: e.target.value})} 
                />
                <label>Plane</label>
                <select name="planes" onChange={(e)=>this.setState({plane: e.target.value})} >
                <option></option>
                    {this.state.searchResults.map(plane => <option key={plane.id} value={plane.id}>{plane.name}</option>  )}
                </select>
                
                </div>
                <button>Create Flight</button>
            </form>
        </div>
        );
    }
}