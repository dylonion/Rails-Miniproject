import React from 'react'

import Card from './card'
import CardToggle from './CardToggle'


function CardsPage(props) {
  return (
    <div className="cardspage">
      <CardToggle
        changeCard={props.changeCard}
        options={props.options}
        activeCard={props.activeCard}
      />
      <Card
        toggled={props.toggled}
        backContent={props.backContent}
        frontContent={props.frontContent}
      />
    </div>
  )
}

export default CardsPage
