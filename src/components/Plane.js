// import React, { Component } from 'react'

// export default class Plane extends Component {
  
  
//   render() {
//     return (
//       <div className="plane-seating-container"> 




 

import React, { Component } from 'react'

export default class Plane extends Component {
  
  
  
  render() {
    return (
      <div className="plane-seating-container"> 
        {
          Array(this.props.plane.total_rows).map(row => {

            return <div></div>


          })
          
        }


      </div>
    )
  }






}



  