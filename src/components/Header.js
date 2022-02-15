import React, { Component } from 'react'
import './Header.css';

export default class Header extends Component {
  
  handleClick = ()=>{
    console.log('clicked');
    this.props.history.push('/search')
  }

  render() {
    return (
      <div className='header-wrapper'>
        <h1>ZZY Airlines</h1>
        <button onClick={this.handleClick}>Search Page</button>
      </div>
    )
  }
}
