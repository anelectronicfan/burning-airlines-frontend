// import React, { Component } from 'react'

// export default class Plane extends Component {
  
  
//   render() {
//     return (
//       <div className="plane-seating-container"> 




 

import React, { Component } from 'react'

export default class Plane extends Component {
  
  state={
    rowArray: [],
    colArray: []
  }

  componentDidMount(){

    // rowA = Array(parseInt(this.props.plane.total_rows))
    // colA = Array(parseInt(this.props.plane.total_columns))

    const rowA = []
    const colA = []

    for(let i = 0; i < this.props.plane.total_rows; i++ ){
      rowA.push(i)
    }
    for(let i = 0; i < this.props.plane.total_columns; i++ ){
      colA.push(i)
    }

    this.setState({rowArray: rowA  }) 
    this.setState({colArray:  colA }) 
  }
  
  render() {
    
    

    return (
      <div className="plane-container">

        <h2>{this.props.plane.name}</h2>

        <div className="plane-details-container">
          <p className="sectionTitle">Plane Details</p>
          <p className="plane-details">Rows: {this.props.plane.total_rows}</p>
          <p className="plane-details">Columns: {this.props.plane.total_columns}</p>
          <p className="plane-details">Total Seats: {parseInt(this.props.plane.total_columns) * parseInt(this.props.plane.total_rows)}</p>
          <p className="plane-details">Date Created: {this.props.plane.created_at}</p>
        </div>


        <div className="plane-seating-container"> 
          {this.state.rowArray.map((row,i) => {
            return (
              <div key={i} className='plane-seating-row'>
              {this.state.colArray.map((col,i)=>{
                return (
                  <div className='plane-seating-seat'>
                  {`${i+1}${String.fromCharCode(col+65)}`}
                  </div>
                )
              })}
              
              </div>)} 
            )}


        </div>
    

      </div>



    )
  }


  

}



  