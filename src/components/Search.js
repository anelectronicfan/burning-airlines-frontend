import React, { Component } from 'react'

export default class Search extends Component {

  state = {
    queryFrom: '',
    queryTo: '',
    searchResults: [], // results to show on the page    
    loading: false,  // controls whether or not to show loading message
    error: null  // whether or not to show an error message
  }

  // Handles the input to both text fields ("To" and "From")
  handleChange = (e)=>{
    // console.log(e.target.getAttribute('data-query'));
    if (e.target.getAttribute('data-query') === 'from'){ // If the input has the data-query value of "from"
      this.setState({queryFrom: e.target.value }) // Set the state of queryFrom to the value
    } else { // The inputs data-query must be "to"
      this.setState({queryTo: e.target.value}) //Set the state of queryTo to the value
    }
  }

  // Handle the form submission
  handleSubmit = (e)=>{
    e.preventDefault()
    console.log(`SUBMIT! from: ${this.state.queryFrom}, to: ${this.state.queryTo}`);
  }

  render() {
    return (
      <div>
    
        <div className='search-form-container'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder='From' data-query='from' onChange={this.handleChange}/>
            <input type="text" placeholder='To' data-query='to' onChange={this.handleChange}/>
            <button>Search</button>
          </form>
        </div>

      </div>
    )
  }
}
