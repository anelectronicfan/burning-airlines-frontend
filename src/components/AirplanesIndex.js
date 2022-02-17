import axios from 'axios';
import React, { Component } from 'react'
import Plane from './Plane'



const RAILS_AIRPLANES_BASE_URL = "http://localhost:3000/airplanes";


export default class AirplanesIndex extends Component {

  state={
    searchResults: [],
    name: '',
    rows: '',
    columns: ''
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

  handleSubmit=(e)=>{
    e.preventDefault()
    console.log('SUBMIT CLICKED');
  }
  
    
  render() {
    return (
      <div>
        <h2>Make a new plane</h2>
          
        <div className="search-form-container">
          <form onSubmit={this.handleSubmit}>
          <label id="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              id='name'
              onChange={(e)=>this.setState({name: e.target.value})}
            />
            <label id="rows">Rows</label>
            <input
              type="number"
              min="1"
              max="100"
              id="rows"
              onChange={(e)=>this.setState({rows: e.target.value})}
            />
            <label id="columns">columns</label>
            <input
              type="number"
              min="1"
              max="20"
              id="columns"
              onChange={(e)=>this.setState({columns: e.target.value})}
            />
            <button>Create</button>
          </form>
        </div>

        {this.state.searchResults.map(plane => <Plane plane={plane} key={plane.id}/>)}

      </div>
    )
  }
}
