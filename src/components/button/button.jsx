import React from 'react'

const button = ({type, onclick, value, classes}) => {
  return (
    <button type={type} className={classes} onClick={onclick}>{value}</button>
  )
}

export default button