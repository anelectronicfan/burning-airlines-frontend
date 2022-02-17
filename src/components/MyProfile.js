import React from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export default class MyProfile extends React.Component {
  state = {
    currentUser: {
      name: '',
      email: ''
    }
  }

  componentDidMount(){
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`${BASE_URL}/users/current`, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      this.setState({currentUser: res.data})
    })
    .catch(err => console.warn(err))
  }

  render(){
    return(
      <div>
        <h1>Welcome {this.state.currentUser.name}</h1>
        <h4>Email: {this.state.currentUser.email}</h4>
      </div>
    );
  }


}