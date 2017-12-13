import React from 'react'

import { Redirect } from 'react-router-dom'

function ThingCreate(props) {
  return (
    <div className="thing-form">
      <form onSubmit={props.handleThingSubmit}>
        <input
          type="text"
          name="thingName"
          placeholder="Name"
          value={props.thingName}
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="thingDesc"
          placeholder="Description"
          value={props.thingDescription}
          onChange={props.handleInputChange}
        />
        <input type="submit" value="Add that thing!" />
      </form>
      {(props.shouldFireRedirect) ? <Redirect to="/dash" /> : ''}
    </div>
  )
}

export default ThingCreate
