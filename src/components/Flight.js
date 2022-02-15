import React, { Component } from 'react'


// Function to generate a 2d array
function generate2dArray(columns, rows) {
  const array2d = [];
  for (let i = 0; i < rows; i++) {
    let array1d = [];
    for (let j = 0; j < columns; j++) {
      array1d.push(j);
    }
    array2d.push(array1d);
  }
  return array2d;
}

function render2dArray(grid) {
  return (
    <table>
      <tbody>
        {grid.map((item, index) => {
          return (
            <tr>
              {item.map((sItem, sIndex) => 
                <td>{sIndex}</td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}  


export default class Flight extends Component {
  state = {
    flight: {
      id: 2,
      origin: "sydney",
      destination: "melbourne",
      date: "2022/05/09",
      airplane_id: 1
    },
    airplane: {
      name: "first airplane",
      total_rows: "15",
      total_columns: "7"
    },
    
  }

  
  
  

  
  render() {
    const rows = this.state.airplane.total_rows;
    const columns = this.state.airplane.total_columns;
    const seatGrid = generate2dArray(columns, rows);

    return (
      <div>
        Flight {this.state.flight.id}

        <div>
          {render2dArray(seatGrid)}

        </div>
        
      </div>
    )
  }
}
