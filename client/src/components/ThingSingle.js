import React from 'react'

function Thing(props) {
  return (
    <div className={`thing-${props.type}`}>
      <h3>{props.thing.name}</h3>
      <p>{props.thing.description}</p>
      {(props.thing.username) ? <p className="user">{props.thing.username}</p> : ''}
    </div>
  )
}

export default Thing
