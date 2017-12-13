import React from 'react'

function CardToggle(props){
  return(
    <div className="cardToggle-container">
      { props.options.map(el => <button className={props.activeCard === el.name ? "activeButton" : ""} onClick={(e) => {props.changeCard(el.name)}}>{el.name}</button>)  }
    </div>
  )
}

export default CardToggle
