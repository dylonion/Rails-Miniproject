import React from 'react'
import CardContent from './CardContent'

function Card(props){
  return(
    <div className={props.toggled ? "flip-container toggled" : "flip-container"}>
      <div className="flipper">
        <div className="front">
          <CardContent content={props.toggled ? props.backContent : props.frontContent} />
        </div>
        <div className="back">
          <CardContent content={props.toggled ? props.frontContent : props.backContent} />
        </div>
      </div>
    </div>
  )
}

export default Card
