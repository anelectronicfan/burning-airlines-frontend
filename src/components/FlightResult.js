import React from 'react'

const FlightResult = (props) => {

  return (
    <tr>
    <td>{props.info.date}</td>
    <td>{props.info.id}</td>
    <td>{props.info.origin}>{props.info.destination}</td>
    <td>{props.info.plane_name}</td>

    </tr>
    
  )
}

export default FlightResult