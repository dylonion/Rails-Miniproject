import React, { Component } from 'react'
import axios from 'axios'

import Auth from '../modules/Auth'
// import ThingSingle from './ThingSingle'
import CardsPage from './cards/CardsPage'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      userData: null,
      userDataLoaded: false,
      userThings: null,
      userThingsLoaded: false,
      activeCard: '',
      prevCard: '',
      toggled:false
    }
    this.changeCard = this.changeCard.bind(this)
  }

  componentDidMount() {
    this.props.resetFireRedirect()
    fetch('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
      }
    }).then(res => res.json())
    .then(res => {
      this.setState({
        userData: res.user,
        userDataLoaded: true,
        userThings: res.things,
        userThingsLoaded: true,
        activeCard: res.things[0],
        prevCard: res.things[1]
      })
    })
  }

  changeCard(name){
    let newActive = this.state.userThings.find((el) => el.name === name)
    if(newActive&&this.state.activeCard.name != name){
      this.setState({
        prevCard: this.state.activeCard,
        activeCard: newActive,
        toggled: !this.state.toggled
      })
    }
  }
  // render() {
  //   return (
  //     <div className="dash">
  //       {
  //         (this.state.userThingsLoaded) ? this.state.userThings.map(thing => {
  //           return <ThingSingle key={thing.id} type="dash" thing={thing} />
  //         }) : <p>Loading...</p>
  //       }
  //     </div>
  //   )
  // }
  render() {
    return (
      <div className="dash">
      {
        this.state.userThingsLoaded?
        <CardsPage
          changeCard={this.changeCard}
          activeCard={this.state.activeCard.id}
          frontContent={this.state.activeCard}
          backContent={this.state.prevCard}
          toggled={this.state.toggled}
          options={this.state.userThings}
        />
        : <p>Loading...</p>
      }
      </div>
    )
  }
}

export default Dashboard
