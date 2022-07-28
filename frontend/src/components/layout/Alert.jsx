import React from 'react'

function Alert(props) {
  return (
    <div className={`alert alert-${props.alert.type} fixed-top`} role="alert">
        {props.alert.message}
    </div>
  )
}

export default Alert