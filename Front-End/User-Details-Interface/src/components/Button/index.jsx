import React from 'react'
import './button.css'
const Button = (props) => {
  return (
    <div>
        <button className={props.className} onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default Button