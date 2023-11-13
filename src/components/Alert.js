import React from 'react'

function Alert(props) {
  const capitalize = (word)=>{
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
   <div className={`alert alert-${props.Type} alert-dismissible fade show`} role="alert">
  <strong>{capitalize(props.Type)}</strong> {props.msg}
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  )
}

export default Alert