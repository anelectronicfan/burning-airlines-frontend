import React from 'react'

const FlightResult = (props) => {

  const handleClick = (id)=>{
    console.log('clicked', id);
    props.history.push(`/flight/${id}`)
  }

  return (
    <tr onClick={()=>handleClick(props.info.id)} className='table-row'>
      <td>{props.info.date}</td>
      <td>{props.info.id}</td>
      <td>{props.info.origin}</td>
      <td>{props.info.destination}</td>
      <td>{props.info.plane_name}</td>
      <td>{props.info.remaining_seats}</td>
    </tr>
  )
}

export default FlightResult