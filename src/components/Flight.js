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

// function to render the plane's seat grid
function render2dArray(grid) {
  return (
    <table>
      <tbody>
        {grid.map((item, row) => {
          return (
            <tr>
              {item.map((sItem, column) => 
                <td key={row, column}>
                  <div className="seat" onClick={() => handleClick(column, row)}>
                    Column: {column}, Row: {row}
                  </div>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// function to handle events when a seat is clicked
function handleClick(column, row) {
  console.log("handleClick(): Column:",column, "Row:", row);
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
    reservations: [
      {user_id: 1, seat_row: 1, seat_column: 1, user_name: "Luke"},
      {user_id: 2, seat_row: 2, seat_column: 2, user_name: "Ro"},
      {user_id: 3, seat_row: 3, seat_column: 3, user_name: "Shay"},
    ]
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

