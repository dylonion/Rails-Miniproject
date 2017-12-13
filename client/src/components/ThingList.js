import React, { Component } from 'react'
import ThingSingle from './ThingSingle'

import axios from 'axios'

class ThingList extends Component {
  constructor() {
    super()
    this.state = {
      thingData: null,
      thingDataLoaded: false
    }
  }

  componentDidMount() {
    axios('/things', {method: 'GET'})
    .then(res => {
      console.log(res.data.things)
      this.setState({
        thingData: res.data.things,
        thingDataLoaded: true
      })
    })
  }

  showThings() {
    return this.state.thingData.map(thing => {
      return (
        <ThingSingle type="list" thing={thing} key={thing.id} />
      )
    })
  }

  render() {
    return (
      <div className="thingList">
        {(this.state.thingDataLoaded) ? this.showThings() : <p>Loading...</p>}
      </div>
    )
  }
}

export default ThingList
