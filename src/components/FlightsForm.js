import React, { Component } from 'react';
// import Select from 'react-select';
import './FlightsIndex.css';

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
    };

    handleSubmit=(e) =>{
        e.preventDefault()
        console.log('submit clicked');
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
                <select options={selectPlanes} placeholder={'Planes'} />
                </div>
                <button>Create Flight</button>
            </form>
        </div>
        );
    }
}