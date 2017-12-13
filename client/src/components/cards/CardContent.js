import React from 'react'

function CardContent(props){
  return(
    <div className="card-content">
      <h3>{props.content ? props.content.name : ''}</h3>
      <p>{props.content ? props.content.description : ''}</p>
    </div>
  )
}

export default CardContent
